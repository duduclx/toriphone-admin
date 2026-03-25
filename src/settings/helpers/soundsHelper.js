/*
usage in 
incallsEdit
ivrEdit
callfilterEdit
GroupEdit
ScheduleEdit
QueueEdit
SwitchboardEdit
UserEditFallbacks
*/

const useSoundsHelper = () => {

    const getSoundLabel = (ivrsound, sounds) => {
        if (ivrsound) {
          const menuSoundPath = ivrsound.split("/");
          const soundName = menuSoundPath[7];
          const fileName = menuSoundPath[menuSoundPath.length - 1];
          const sound = sounds.items.find((s) => s.name === soundName);
    
          if (sound) {
            const file = sound.files.find((f) => f.name === fileName);
    
            if (file) {
              let format = file.formats[0]?.format || "unknown";
              if (format === "slin") {
                format = "wav";
              }
    
              // Construire le label
              return {
                label: `${sound.name} - ${file.name} (${format})`,
                value: ivrsound,
              };
            }
          }
        }
      };


  return { getSoundLabel }
}

export default useSoundsHelper