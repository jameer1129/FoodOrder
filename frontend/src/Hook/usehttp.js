import { useCallback, useEffect, useState } from "react"

async function sendHttpRequest(url,config) {
   const respons = await fetch(url,config)
   const resData = await respons.json()
   if(!respons.ok) {
      throw new Error(
         resData.message || 'Something went, failed to send request.'
      )
   }
   return resData
}

export default function useHttp(url,config,initialData) {
   const [data, setData] = useState(initialData)
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState()
   const sendRequest = useCallback(
      async function sendRequest(data) {
         setIsLoading(true)
         try {
            const resData =await sendHttpRequest(url,{...config, body:data})
            setData(resData)
         }
         catch(error) {
            setError(error.message || 'Something went, failed to send request.')
         }
         setIsLoading(false)
      },
   [url,config])
   useEffect(()=>{
      if(config && (config.method === 'GET' || !config.method)) {
         sendRequest()
      }
   },[sendRequest])
   function cleardata() {
      setData(initialData)
   }
   return {
      data,
      isLoading,
      error,
      sendRequest,
      cleardata
   }
}