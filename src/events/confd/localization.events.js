const localizationEvents = () => {
    // localization_edited
    const OnLocalizationEdited = (data) => {
        console.log("localization_edited", data);
    };

    return {
        OnLocalizationEdited
    };
};

export default localizationEvents;
