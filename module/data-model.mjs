const {
  HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField
} = foundry.data.fields;

class CharacterData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			biography: new HTMLField(),
			health: new SchemaField({
				value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
				min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
				max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
			}),
			traits: new ArrayField(new StringField()),
			expertise: new ArrayField(new StringField()),
			total_xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
			unspent_xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
		};
	}
}