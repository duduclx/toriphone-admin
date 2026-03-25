const ivrEvents = () => {
    // ivr_created
    const onIvrCreated = async (data) => {
        console.log("ivr_created", data);
    }

    // ivr_deleted
    const onIvrDeleted = async (data) => {
        console.log("ivr_deleted", data);
    }

    // ivr_edited
    const onIvrEdited = async (data) => {
        console.log("ivr_edited", data);
    }
    
    return {
        onIvrCreated,
        onIvrDeleted,
        onIvrEdited
    }
}

export default ivrEvents
