import { SystemActor, SystemItem } from "./document.mjs"
import { CrowData, CreatureData } from "./data-model.mjs"

Hooks.on("init", () => {
	console.log("Initializing MCrows");

	CONFIG.Actor.documentClass = SystemActor;
	CONFIG.Item.documentClass = SystemItem;

	CONFIG.Actor.dataModels = {
		crow: CrowData,
		creature: CreatureData
	}

	CONFIG.Actor.trackableAttributes = {
		crow: {
			bar: ["stamina"],
			value: ["total_xp"]
		},
		creature: {
			bar: ["stamina"],
			value: ["power"]
		}
	};

	console.log("MCrows initialization complete");
});
