const fs = require('fs');
const process = require('process');
const axios = require('axios');

const argv = process.argv;

// async function processUrls(urls){
// 	for (let url of urls){
// 		let page = await getPage(url);
// 		if (page) {
// 			let {hostname} = new URL(url);
// 			writeFile(page, hostname);
// 		}
// 	}
// }

function processUrls(urls){
	const requests = [];
	for (let url of urls){
		requests.push(getPage(url));
	}
	axios.all(requests).then(axios.spread((...pages) =>{
		for (let i=0; i<pages.length; i++){
			if (typeof pages[i] !== "object") {
				let {hostname} = new URL(urls[i]);
				writeFile(pages[i], hostname);
			}
			else console.log(pages[i].error);
		}
	}));
}

function readFile(file){
	fs.readFile(file, 'utf8', (err, data) => {
		if (err){
			console.log(`Error reading ${file}`);
			process.exit(21)
		}
		let urls = data.split('\n')
		processUrls(urls);
	});
}

// async function getPage(url){
// 	try {
// 		let res = await axios.get(url);
// 		return(res.data);
// 	} catch (err) {
// 		console.log(`Couldn't download ${url}`);
// 		return false;
// 	}
// }

async function getPage(url){
	try {
		let res = await axios.get(url);
		return(res.data);
	} catch (err) {
		return {error: `Couldn't download ${url}`};
	}
}

function writeFile(page, hostname){
	let filename = `${hostname}.txt`
	fs.writeFile(`./downloaded-pages/${filename}`, page, 'utf8', (err) => {
		if (err){
			console.error(`Couldn't write ${filename}`);
		}
		else console.log(`Wrote to ${filename} in downloaded-pages folder`)
	});
}

if (!argv[2]) {
	console.log(`File to read needs to be specified`);
	process.exit(21)
}
else readFile(argv[2]);



