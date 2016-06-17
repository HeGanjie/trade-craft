import * as UUID from 'uuid-js';

export enum Gender {
	Male,
	Female
}

export abstract class Animal {
    id: UUID.UUID;
	gender: Gender;
	bornAt: Date;

	constructor(gender: Gender, bornAt: Date) {
		this.id = UUID.create();
		this.gender = gender;
		this.bornAt = bornAt;
	}
}