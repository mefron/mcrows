const {
  HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, BooleanField
} = foundry.data.fields;

class CharacterData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			stamina: new SchemaField({
				value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
				min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
				max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
			}),
		};
	}
}

export class CrowData extends CharacterData {
	static defineSchema() {
		return {
			...super.defineSchema(),
			background: new SchemaField({
				biography: new HTMLField({ required: true, blank: true })
			}),
			traits: new ArrayField(new StringField()),
			expertise: new ArrayField(new StringField()),
			total_xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
			unspent_xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
		};
	}
}

export class CreatureData extends CharacterData {
	static defineSchema() {
		return {
			...super.defineSchema(),
			type: new StringField({
				required: true,
				blank: false,
				options: ["angel", "blood", "demon", "plant", "undead", "unique"],
				initial: "blood"
			}),
			size: new StringField({
				required: true,
				blank: false,
				options: ["tiny", "small", "medium", "large", "huge", "holy_shit"],
				initial: "medium"
			}),
			power: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 100 }),
			likes: new ArrayField(new StringField()),
			hate: new ArrayField(new StringField())
		};
	}
}
