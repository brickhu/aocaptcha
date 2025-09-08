Accounts = Accounts or {}



Handlers.add("Registe","Registe",function(msg)
  local uid = msg['From-Process'] or msg.From
  assert(Accounts[uid] == nil, "the account has been created")
  Accounts[uid] = {
    creator = uid,
    ts_created = msg.Timestamp
  }

  
end)