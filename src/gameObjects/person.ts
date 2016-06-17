import { Animal, Gender } from './animal.ts';


export default class Person extends Animal {
	name: string;

	constructor(name: string, gender: Gender, bornAt: Date ) {
		super(gender, bornAt);
		this.name = name;
	}
}
