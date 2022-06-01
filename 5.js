let roomCount = 0;
let managerCount = 0;
let userCount = 0;

const roomList = [];

class Room {
    constructor(managerId, userId) {
        this.id = `r-${++roomCount}`;
        this.manager = managerId;
        this.users = [userId];
        this.blockedUsers = [];
        this.isClosed = false;
        this.password = null;

		this.printNotice(`채팅방이 개설되었습니다.`);
    }

	printNotice(message) {
		console.log(`[NOTICE] ${message}`);
	}

    managerChat(managerId, message) {
		if (this.manager === managerId) {
			console.log(`[MANAGER MESSAGE] ${message}`);
		}
	}
	
	close(managerId, password) {
		if (this.manager === managerId) {
			this.isClosed = true;
			this.password = password;

			this.printNotice(`방장이 방을 비공개 상태로 설정하였습니다`);
		}
	}

	unclose(managerId) {
		if (this.manager === managerId) {
			this.isClosed = false;
			this.printNotice(`방장이 방을 공개 상태로 설정하였습니다`);
		}
	}

	forcedExitUser(managerId, userId) {
		if (this.manager === managerId) {
			const idx = this.users.indexOf(userId);
			this.users.splice(idx, 1);
			this.printNotice(`방장이 ${userId}를 방에서 내보냈습니다.`);
		}
	}
	
	blockUser(managerId, userId) {
		if (this.manager === managerId) {
			this.blockedUsers.push(userId);
			this.printNotice(`방장이 ${userId}의 대화를 정지했습니다.`);
		}
	}

	unblockUser(managerId, userId) {
		if (this.manager === managerId && this.blockedUsers.indexOf(userId) !== -1) {
			const idx = this.blockedUsers.indexOf(userId);
			this.blockedUsers.splice(idx, 1);
			this.printNotice(`방장이 ${userId}의 대화를 정지를 해제했습니다.`);
		}
	}

	end(managerId) {
		if (managerId) {
			this.manager = null;
			this.users = [];
			this.blockedUsers = [];
			this.isClosed = false;
			this.password = null;
		}

		this.printNotice(`채팅이 종료되었습니다.`);
	}

    chat(userId, message) {
		if (this.blockedUsers.indexOf(userId) === -1) console.log(`[MESSAGE] ${userId}: ${message}`);
	}

	join(userId, password = null) {
		if (this.users.indexOf(userId) !== -1) return;

		if (
			(this.isClosed && this.password === password) ||
			!this.isClosed
		) {
			this.users.push(userId);
			this.printNotice(`${userId} 가 방에 입장했습니다.`);
		}
	}

	leave(userId) {
		const idx = this.users.indexOf(userId);
		if (idx === -1) return;
		
		this.users.splice(idx, 1);
		this.printNotice(`${userId} 가 방에서 나갔습니다.`);
	}
}

class Manager {
    constructor(userId) {
		const id = `m-${++managerCount}`
		this.id = id;
		this.user = userId;
		
		const room = new Room(id, userId);
		this.room = room;
		roomList.push(room);
    }

	chat(message) {
		this.room.managerChat(this.id, message);
	}
	
	close(password) {
		this.room.close(this.id, password);
	}

	unclose() {
		this.room.unclose(this.id);
	}

	forcedExitUser(userId) {
		this.room.forcedExitUser(this.id, userId);
	}
	
	blockUser(userId) {
		this.room.blockUser(this.id, userId);
	}

	unblockUser(userId) {
		this.room.unblockUser(this.id, userId);
	}

	end() {
		this.room.end(this.id);
	}
}

class User {
	constructor() {
		this.id = `u-${++userCount}`;
		this.manager = null;
    }

	open() {
		this.manager = new Manager(this.id);
	}
}

const user1 = new User();
user1.open();

const user2 = new User();
const user3 = new User();
const user4 = new User();
const user5 = new User();

const room = roomList[0];

room.join(user2.id);
room.join(user3.id);
room.join(user4.id);

room.chat(user2.id, '안녕하세요!');
room.chat(user3.id, '안녕하세요!');
room.chat(user4.id, '안녕하세요!');

user1.manager.blockUser(user4.id);
room.chat(user4.id, '안녕하세요!');

user1.manager.unblockUser(user4.id);
room.chat(user4.id, '안녕하세요!');

room.leave(user4.id);

user1.manager.forcedExitUser(user2.id);

user1.manager.close('asdf');

room.join(user4.id, 'asdf');

room.leave(user4.id);

user1.manager.unclose();

room.join(user4.id);

user1.manager.chat('안녕하세요!');

// output:

// [NOTICE] 채팅방이 개설되었습니다.
// [NOTICE] u-2 가 방에 입장했습니다.
// [NOTICE] u-3 가 방에 입장했습니다.
// [NOTICE] u-4 가 방에 입장했습니다.
// [MESSAGE] u-2: 안녕하세요!
// [MESSAGE] u-3: 안녕하세요!
// [MESSAGE] u-4: 안녕하세요!
// [NOTICE] 방장이 u-4의 대화를 정지했습니다.
// [NOTICE] 방장이 u-4의 대화를 정지를 해제했습니다.
// [MESSAGE] u-4: 안녕하세요!
// [NOTICE] u-4 가 방에서 나갔습니다.
// [NOTICE] 방장이 u-2를 방에서 내보냈습니다.
// [NOTICE] 방장이 방을 비공개 상태로 설정하였습니다
// [NOTICE] u-4 가 방에 입장했습니다.
// [NOTICE] u-4 가 방에서 나갔습니다.
// [NOTICE] 방장이 방을 공개 상태로 설정하였습니다
// [NOTICE] u-4 가 방에 입장했습니다.
// [MANAGER MESSAGE] 안녕하세요!