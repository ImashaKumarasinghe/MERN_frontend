import { createClient } from "@supabase/supabase.js"
const url = "https://lldezvxoqwqrjjijpadi.supabase.co"
const key = "//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZGV6dnhvcXdxcmpqaWpwYWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjAzMTUsImV4cCI6MjA3NzczNjMxNX0.YO20WIJO9_JIKe8IIbXIRYj5Lq1Urse59w7uKMTMWXw"
  

const supabase = createClient(url,key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve,reject)=>{
            if(file===null){
                reject("No file provided")
                return
            }
            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                ()=>{
                    reject("Error occured in supabase connection")
                }
            )
        }
    )
             

        }
    
    return mediaUploadPromise