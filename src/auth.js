import PocketBase from 'pocketbase'

export const pb = new PocketBase('https://pb.mohil.ca/');

if(localStorage.length > 0 && localStorage.key(localStorage.getItem("pocketbase_auth").length === 1)) {
	pb.collection("users").authRefresh()
}

export async function downloadImageFromUrl(url) {
  const xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url, true);
  xmlHTTP.responseType = 'blob';
  const imageBlob = await new Promise((resolve, reject) => {
    xmlHTTP.onload = e => xmlHTTP.status >= 200 && xmlHTTP.status < 300 && xmlHTTP.response.type.startsWith('image/') ? resolve(xmlHTTP.response) : reject(Error(`wrong status or type: ${xmlHTTP.status}/${xmlHTTP.response.type}`));
    xmlHTTP.onerror = reject;
    xmlHTTP.send();
  });
	const file = new File([imageBlob], 'image.png', {type: imageBlob.type});
  return file;
}

export async function googleAuth() {
	await pb.collection('users').authWithOAuth2({provider: 'google'}).then((authData) => {
		if(authData.meta.isNew) {
			downloadImageFromUrl(authData.meta.avatarUrl).then(async (image) => {
				const userData = new FormData();
				userData.append("name", authData.meta.name);
				userData.append("avatar", image);
				await pb.collection('users').update(authData.record.id, userData)
			})
		}
	})
}