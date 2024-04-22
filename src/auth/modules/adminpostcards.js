import { useEffect, useState } from 'react';
import { pb } from '../../auth';
import styles from './css/admin.module.css'

export default function AdminPosts() {
	const [posts, setPosts] = useState(0);

	useEffect(() => {
		pb.collection('admin_posts').getFullList({
			sort: '-created',
		}).then((res) => {
			var test = res.map((post) => {
				const created = new Date(post.created)
				return (
					<div className={styles.postHolder}>
						<div className={styles.post}>{post.post}</div>
						<div className={styles.postDate}>{created.toLocaleDateString('en-US')}</div>
						<div className={styles.postTime}>{created.toLocaleTimeString('en-US', {
							hour: '2-digit',
							minute:'2-digit'
						})}</div>
					</div>
				)
			})
			console.log(test);
			setPosts(test);
		}).catch(() => {})
	}, [])

	return (
		<div className={styles.card}>
			<div className={styles.title}>
			Announcements:
			</div>
			<div className={styles.posts}>
				{posts}
			</div>
		</div>
	);
}
