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

class CrowData extends CharacterData {
	static defineSchema() {
		return {
			...super.defineSchema(),
			background: new SchemaField({
				biography: new HTMLField()
			}),
			traits: new ArrayField(new StringField()),
			expertise: new ArrayField(new StringField()),
			total_xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
			unspent_xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
		};
	}
}

class CreatureData extends CharacterData {
	static defineSchema() {
		return {
			...super.defineSchema(),
			type: new StringField({
				required: true,
				blank: false,
				options: ["blood", "undead"],
				initial: "blood"
			}),
			power: new SchemaField({
				value: new NumberField({ required: true, integer: true, min: 1, initial: 1, max: 5 })
			}),
		};
	}
}
