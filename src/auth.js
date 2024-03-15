import PocketBase from 'pocketbase'
export const pb = new PocketBase('https://pb.mohil.ca/');

export async function checkAuth() {
	if(localStorage.length > 0 && localStorage.getItem("pocketbase_auth") !== null) {
		await pb.collection("users").authRefresh().then((res) => {
			if(!pb.authStore.isValid) {
				signOut();
			}
		})
		.catch((err) => {
			if(err.status === 401) {
				signOut();
			}
			return;
		})
	}
}

export function signOut() {
	pb.authStore.clear();
	window.location.reload()
}

export function getUserImage() {
	if(pb.authStore.isValid) {
		let url = localStorage.getItem("profileURL");
		if(url === null || url === undefined) {
			url = pb.files.getUrl(pb.authStore.model, pb.authStore.model.avatar, {'thumb': '96x96'});
			if(url != "") {
				localStorage.setItem("profileURL", url);
			}
		}
		return url;
	}
	return "";
}

export function getUser() {
	if(pb.authStore.isValid) {
		return pb.authStore.model
	}
	return "";
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