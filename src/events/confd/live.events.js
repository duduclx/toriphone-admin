const liveEvents = () => {
    // live_reload_edited
    const onLiveReloadEdited = (data) => {
        console.log("live_reload_edited", data);
    };

    return {
        onLiveReloadEdited,
    };
};

export default liveEvents;
