const express=require("express")
const app=express()
const cheerio=require("cheerio")
const request=require("request")
app.listen(process.env.PORT || 4040)



	app.get("/insta",(req,res)=>{

const user=req.query.username;
request("https://instagram.com/"+user,(eror,response,html)=>{
	console.log("\n\n\n- - - - - - istek gonderildi {Send Request} - - -  - -\n\n\n")
		if(eror){console.log("Hata Var{Error Available} = > "+eror)}
			
		var $=cheerio.load(html,{xmlMode:true,
		decodeEntities: true, 
    	withStartIndices: false, 
    	withEndIndices: false,})
		var title= $('meta[property="og:title"]').attr('content')
		var pp=$('meta[property="og:image"]').attr('content')

	
		var script=$('script[type="text/javascript"]')
		var dataCek=script["3"]
		var text=dataCek.children["0"].data
		var str = text.substr(text.indexOf('{'), text.indexOf('}'));
		//var orj_script=JSON.parse(str)
		//console.log(orj_script)



		var scriptLd=$('script[type="application/ld+json"]')
		var scriptff=scriptLd["0"].children["0"].data
		var scriptfff=JSON.parse(scriptff)

		const FullName=scriptff['name']

		const json={
						username:user,
						profile_picture_url:pp

				   }

		res.json(json)
	

		});

		

		

		
		

	})