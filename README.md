# What point

docs to come, look for api requests in pages/api

## API calls
This project batches both testnet and mainnet api calls on the same url, differentiating them with the chainId      
   
Blast Testnet API- https://what-point.vercel.app/api/168587773    
Blast Mainnet API - https://what-point.vercel.app/api/81457  

Example on Mainnet  
https://what-point.vercel.app/api/81457     
GET v1/contracts/:contractAddress/point-balances   




You must not do this, the blast api doesnt do this, this was simply done to not have to host another api wrapper url seperate from the one connected to this frontend   
You may wonder, why i had to create a wrapper, one word "CORS", was getting cors error, and i decided to use a wrapper (routing all frontend request to the api on my backend?)    

```
http://localhost:3000/xxxx has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```