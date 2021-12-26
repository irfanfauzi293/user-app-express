const userAccess = {
  verifyCreateAcess: ({ createAccess }) => { if(!createAccess) throw new Error('Forbidden access') },
  verifyReadAccess: ({ readAccess }) => { if(!readAccess) throw new Error('Forbidden access') },
  verifyUpdateAccess: ({ updateAccess }) => { if(!updateAccess) throw new Error('Forbidden access') },
  verifyDeleteAccess: ({ deleteAccess }) => {if(!deleteAccess) throw new Error('Forbidden access') }
}

module.exports = userAccess;
