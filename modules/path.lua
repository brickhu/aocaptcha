--[[
  SvgPathConverter.lua
  一个功能齐全的通用SVG路径转换器模块。
  支持有序的几何变换，并新增了路径结构混淆功能，
  以防止通过分析d属性来识别原始形状。

  作者: Gemini
  版本: 4.0
]]

local SvgPathConverter = {}

-- =============================================================================
-- 1. 内部辅助模块：向量和矩阵数学库
-- =============================================================================

local vector = {}
vector.__index = vector

local function new_vector(x, y)
  return setmetatable({x = x or 0, y = y or 0}, vector)
end

function vector:transform(matrix)
  local new_x = self.x * matrix[1][1] + self.y * matrix[1][2] + matrix[1][3]
  local new_y = self.x * matrix[2][1] + self.y * matrix[2][2] + matrix[2][3]
  return new_vector(new_x, new_y)
end

local function identity_matrix() return {{1, 0, 0}, {0, 1, 0}} end
local function create_translation_matrix(tx, ty) return {{1, 0, tx or 0}, {0, 1, ty or 0}} end

local function create_rotation_matrix(angle_deg, cx, cy)
  cx, cy = cx or 0, cy or 0
  local angle_rad = math.rad(angle_deg or 0)
  local cos_a, sin_a = math.cos(angle_rad), math.sin(angle_rad)
  local tx = cx - cx * cos_a + cy * sin_a
  local ty = cy - cx * sin_a - cy * cos_a
  return {{cos_a, -sin_a, tx}, {sin_a,  cos_a, ty}}
end

local function create_scaling_matrix(sx, sy, cx, cy)
    sx, sy = sx or 1, sy or 1
    cx, cy = cx or 0, cy or 0
    local tx = cx * (1 - sx)
    local ty = cy * (1 - sy)
    return {{sx, 0,  tx}, {0,  sy, ty}}
end

local function create_skew_matrix(x_angle, y_angle)
    local tan_x = math.tan(math.rad(x_angle or 0))
    local tan_y = math.tan(math.rad(y_angle or 0))
    return {{1, tan_x, 0}, {tan_y, 1, 0}}
end

local function multiply_matrices(m1, m2)
    local r = {{0,0,0},{0,0,0}}
    r[1][1] = m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1]; r[1][2] = m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2]; r[1][3] = m1[1][1] * m2[1][3] + m1[1][2] * m2[2][3] + m1[1][3]
    r[2][1] = m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1]; r[2][2] = m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2]; r[2][3] = m1[2][1] * m2[1][3] + m1[2][2] * m2[2][3] + m1[2][3]
    return r
end

-- =============================================================================
-- 2. 内部辅助模块：SVG路径处理
-- =============================================================================

--- (新增) 路径混淆引擎：在线段上插入额外的点
-- @param path_data 解析后的路径数据
-- @param density 每个线段上插入的点的数量
-- @return table 包含额外点的新的路径数据
local function _obfuscate_path(path_data, density)
    local new_path = {}
    local current_x, current_y = 0, 0
    density = density or 1

    for _, segment in ipairs(path_data) do
        local cmd, params = segment.command, segment.params
        local upper_cmd = cmd:upper()
        local abs_params = {}
        for i=1, #params do abs_params[i] = params[i] end

        -- 将坐标转换为绝对坐标以便计算
        if cmd:match("[a-z]") then
            if cmd == 'h' then abs_params[1] = abs_params[1] + current_x
            elseif cmd == 'v' then abs_params[1] = abs_params[1] + current_y
            else for i=1, #abs_params, 2 do abs_params[i], abs_params[i+1] = abs_params[i] + current_x, abs_params[i+1] + current_y end end
        end

        local target_x, target_y
        if upper_cmd ~= 'Z' and #abs_params > 0 then
            target_x, target_y = abs_params[#abs_params-1], abs_params[#abs_params]
        else
            target_x, target_y = current_x, current_y -- Z命令回到起点
        end

        -- 如果是直线类命令，则进行混淆
        if upper_cmd == 'L' or upper_cmd == 'H' or upper_cmd == 'V' then
            local start_x, start_y = current_x, current_y
            if upper_cmd == 'H' then target_y = start_y else target_x = start_x end

            for i = 1, density do
                local t = i / (density + 1)
                local mid_x = start_x + (target_x - start_x) * t
                local mid_y = start_y + (target_y - start_y) * t
                table.insert(new_path, {command = 'L', params = {mid_x, mid_y}})
            end
            table.insert(new_path, {command = 'L', params = {target_x, target_y}})
        else
            -- 其他命令（M, C, Q, A, Z等）保持原样，只转换为绝对命令
            segment.command = upper_cmd
            segment.params = abs_params
            table.insert(new_path, segment)
        end
        current_x, current_y = target_x, target_y
    end
    return new_path
end

local function parse_path(d)
  local path = {}
  for command, args_str in d:gmatch("([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)") do
    local params = {}
    for num in args_str:gmatch("[-]?%d*%.?%d+[eE]?[-]?%d*") do
      table.insert(params, tonumber(num))
    end
    table.insert(path, {command = command, params = params})
  end
  return path
end

local function serialize_path(path_data)
  local d_parts = {}
  for _, segment in ipairs(path_data) do
    local params_str = {}
    for _, p in ipairs(segment.params) do
      local formatted_num = string.format("%.3f", p):gsub("0+$", ""):gsub("%.$", "")
      if formatted_num == "-0" then formatted_num = "0" end
      table.insert(params_str, formatted_num)
    end
    local part = segment.command
    if #params_str > 0 then
        part = part .. " " .. table.concat(params_str, " ")
    end
    table.insert(d_parts, part)
  end
  return table.concat(d_parts, " ")
end

local function transform_path(path_data, matrix)
    local new_path, min_x, min_y, max_x, max_y = {}, math.huge, math.huge, -math.huge, -math.huge
    for _, segment in ipairs(path_data) do
        local transformed_params = {}
        if segment.command ~= 'Z' then
            if segment.command == 'A' then
                local end_point = new_vector(segment.params[6], segment.params[7]):transform(matrix)
                transformed_params = {segment.params[1], segment.params[2], segment.params[3], segment.params[4], segment.params[5], end_point.x, end_point.y}
                transformed_params[1], transformed_params[2] = transformed_params[1] * math.abs(matrix[1][1]), transformed_params[2] * math.abs(matrix[2][2])
            else
                for i=1, #segment.params, 2 do
                    local p = new_vector(segment.params[i], segment.params[i+1]):transform(matrix)
                    table.insert(transformed_params, p.x); table.insert(transformed_params, p.y)
                end
            end
        end
        
        table.insert(new_path, {command = segment.command, params = transformed_params})

        for i=1, #transformed_params, 2 do
            min_x, min_y = math.min(min_x, transformed_params[i]), math.min(min_y, transformed_params[i+1])
            max_x, max_y = math.max(max_x, transformed_params[i]), math.max(max_y, transformed_params[i+1])
        end
    end

    if min_x == math.huge then return new_path, {x=0, y=0, width=0, height=0} end
    return new_path, {x = min_x, y = min_y, width = max_x - min_x, height = max_y - min_y}
end

-- =============================================================================
-- 3. 公共API
-- =============================================================================

---
-- 通用SVG路径转换器主函数。
-- @param config table 包含所有配置的表。
--   - `d` (string, required): 原始SVG路径 'd' 字符串。
--   - `viewBox` (string, optional): 用于计算默认变换中心。
--   - `transformations` (table, optional): 有序变换操作的列表。
--   - `obfuscate` (table, optional): 路径混淆配置。
--     - `density` (number): 在每个直线段上插入的点的数量，默认为1。
-- @return string: 新的'd'路径, string: 新的viewBox。
---
function SvgPathConverter:convert(viewbox,d,config)
  local d_str = d
  if not d_str then error("Configuration table must contain a 'd' string.") end

  -- 1. 解析路径
  local parsed_path = parse_path(d_str)

  -- 2. (新增) 如果需要，进行路径混淆
  if config.obfuscate and config.obfuscate.density and config.obfuscate.density > 0 then
    parsed_path = _obfuscate_path(parsed_path, config.obfuscate.density)
  end

  -- 3. 计算最终变换矩阵
  local final_matrix = identity_matrix()
  local t = config.transformations or {}
  local has_direct_matrix = false
  for _, op in ipairs(t) do
    if op.type == 'matrix' then
      local v = op.values
      final_matrix = {{v[1], v[3], v[5]}, {v[2], v[4], v[6]}}
      has_direct_matrix = true
      break
    end
  end

  if not has_direct_matrix then
    local center_x, center_y = 0, 0
    if viewbox then
      local vb = {}
      for n in viewbox:gmatch("[-]?%d*%.?%d+") do table.insert(vb, tonumber(n)) end
      if #vb == 4 then center_x, center_y = vb[1] + vb[3]/2, vb[2] + vb[4]/2 end
    end
    for _, op in ipairs(t) do
      local op_matrix
      if op.type == 'scale' then op_matrix = create_scaling_matrix(op.sx, op.sy, op.cx or center_x, op.cy or center_y)
      elseif op.type == 'rotate' then op_matrix = create_rotation_matrix(op.angle, op.cx or center_x, op.cy or center_y)
      elseif op.type == 'translate' then op_matrix = create_translation_matrix(op.tx, op.ty)
      elseif op.type == 'skew' then op_matrix = create_skew_matrix(op.x_angle, op.y_angle) end
      if op_matrix then final_matrix = multiply_matrices(op_matrix, final_matrix) end
    end
  end

  -- 4. 对（可能已被混淆的）路径应用几何变换
  local transformed_path_data, new_bounds = transform_path(parsed_path, final_matrix)
  
  -- 5. 序列化最终路径并计算新viewBox
  local new_d = serialize_path(transformed_path_data)
  local new_viewbox = string.format("%.3f %.3f %.3f %.3f",
    new_bounds.x, new_bounds.y, new_bounds.width, new_bounds.height)

  return new_d, new_viewbox
end

return SvgPathConverter

--[[
-- =============================================================================
-- 模块使用示例 (将此部分放在另一个文件中)
-- =============================================================================

-- 假设上面的模块代码保存在 "SvgPathConverter.lua" 文件中
local Converter = require("SvgPathConverter")

print("--- 示例1: 混淆一个矩形的结构 ---")
local config1 = {
  d = "M10 10 H 90 V 90 H 10 Z", -- 使用H和V命令的矩形
  viewBox = "0 0 100 100",
  obfuscate = {
    density = 1 -- 在每条边上插入1个点
  }
}
-- 注意：这里没有应用任何几何变换，只进行结构混淆
local new_d_1, new_vb_1 = Converter:convert(config1)
print("原始 d: " .. config1.d)
print("混淆后 d: " .. new_d_1)
print("新的 viewBox: " .. new_vb_1)
-- 预期输出的d会包含8个L命令而不是4个H/V


print("\n--- 示例2: 混淆的同时进行几何变换 ---")
local config2 = {
  d = "M 20 80 L 80 20",
  viewBox = "0 0 100 100",
  transformations = {
    {type = 'rotate', angle = -45}
  },
  obfuscate = {
    density = 2 -- 在线段上插入2个点
  }
}
local new_d_2, new_vb_2 = Converter:convert(config2)
print("原始 d: " .. config2.d)
print("混淆并变换后 d: " .. new_d_2)
print("新的 viewBox: " .. new_vb_2)
--]]
