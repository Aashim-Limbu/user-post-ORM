import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function insertUser() {
	const user = await prisma.user.create({
		data: {
			email: "aashimlimbu@gmail.com",
			name: "Aashim",
		},
		select: {
			name: true,
		},
	});
	console.log("User created Successfully");
	console.log(user);
}
// insertUser();
async function readUser() {
	const user = await prisma.user.findMany({
		where: {
			name: "Aashim",
		},
	});
	if (user) {
		console.log(user);
	} else {
		console.log("User not Found");
	}
}
readUser();
async function updateUser() {
	const user = await prisma.user.update({
		where: {
			id: "0eec58a5-39fb-4f75-ab8f-56e19e82a91d",
		},
		data: {
			email: "aashimlimbu1@gmail.com",
		},
	});
	console.log("updated the user successfully");
	console.log(user);
}
// updateUser()
async function deleteUser() {
	const user = await prisma.user.delete({
		where: {
			id: "0eec58a5-39fb-4f75-ab8f-56e19e82a91d",
		},
	});
	console.log("User deleted successfully");
	console.log(user);
}
// deleteUser();
