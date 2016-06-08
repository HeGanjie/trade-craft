import * as UUID from 'uuid-js';

export enum Gender {
	Male,
	Female
}

export default class Person {
	id: UUID.UUID;
	name: string;
	gender: Gender;
	bornAt: Date;
	motherId: UUID.UUID;
	fatherId: UUID.UUID;

	constructor(name: string, gender: Gender, bornAt: Date,
		motherId?: UUID.UUID, fatherId?: UUID.UUID) {
		this.id = UUID.create();
		this.name = name;
		this.gender = gender;
		this.bornAt = bornAt;
		this.motherId = motherId;
		this.fatherId = fatherId;
	}
}
