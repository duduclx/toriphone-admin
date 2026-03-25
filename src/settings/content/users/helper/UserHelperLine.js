import { useApis } from "../../../../ApiProvider";

const UserHelperLine = () => {
  const {
    endpointCustomAdd,
    endpointCustomEdit,
    endpointSipEdit,
    endpointSccpAdd,
    endpointSccpEdit,
    extensionCreate,
    extensionDelete,
    lineAdd,
    lineApplicationAssociate,
    lineApplicationDissociate,
    lineDelete,
    lineDevicesGet,
    lineDeviceAssociate,
    lineDeviceDissociate,
    lineEdit,
    lineEndpointsCustomAssociate,
    lineEndpointsSccpAssociate,
    lineExtensionsAssociate,
    lineExtensionsDissociate,
    lineGet,
    userLineAssociate,
    userLineDissociate
  } = useApis();

  // userUpdateLine

  // parallèle
  /*
  const userUpdateLines = async (userCurrent, user) => {
    await Promise.all(user.lines.map(async (line) => {
      // Update templates (always)
      await lineUpdateEndpoint(line);
      
      // Update device (always)
      await lineUpdateDevice(line);
      
      // Obtenir la ligne actuelle pour comparer
      const lineCurrent = await lineGet(line);
      
      // Update position
      await lineUpdatePosition(line, lineCurrent);
      
      // Update extension
      if (line.new_extensions) {
        if (line.extensions[0]?.id) {
          // Dissocier line et line.extensions[0]
          await lineExtensionsDissociate(line, line.extensions[0]);
          // Supprimer line.extensions[0]
          await extensionDelete(line.extensions[0]);
        }
        // Créer line.new_extension
        const newExten = await extensionCreate(line.new_extensions);
        // Associer line avec line.new_extension
        await lineExtensionsAssociate(line, newExten);
      }
      
      // Update application
      await lineUpdateApplication(line, lineCurrent);
    }));
  };
  */

  // asynchrone
  const userUpdateLines = async (userCurrent, user) => {
    // pour chaque ligne dans user.lines
    for (const [index, line] of user.lines.entries()) {
      if (line.id) {
        // Si la ligne existe, on la met à jour
        await lineUpdate(line);
      } else {
        // Sinon, on crée une nouvelle ligne
        await lineCreate(user, line);
      }
    }
    // Trouver et supprimer les lignes présentes dans userCurrent mais absentes dans user
  for (const currentLine of userCurrent.lines) {
    const lineExistsInNewUser = user.lines.some(line => line.id === currentLine.id);
    
    if (!lineExistsInNewUser) {
      // La ligne existe dans userCurrent mais pas dans user, donc on la supprime
      await lineRemove(user, currentLine);
    }
  }
  };

  // remove line
  const lineRemove = async (user, line) => {
    // dissocier line et user
    await userLineDissociate(user, line)
    // dissocier device
    if (line.device_id) {
      await lineDeviceDissociate(line, { id: line.device_id });
    }
    if (line.extensions[0].id) {
      // Dissocier extension
      await lineExtensionsDissociate(line, line.extensions[0]);
      // supprimer extension
      await extensionDelete(line.extensions[0]);
    }
    // supprimer line
    await lineDelete(line)
  }

  // create line
  const lineCreate = async (user, line) => {
    // create line
    const newLine = await lineCreateLine(line);
    // associate line and user
    const associated = await userLineAssociate(user, newLine);
    // associate application
    if (line.application?.uuid) {
      await lineApplicationAssociate(newLine, line.application);
    }
    // associate device
    if (line.device_id) {
      await lineDeviceAssociate(newLine, { id: line.device_id });
    }
    return associated
  };

  const ALPHANUMERIC_POOL = "abcdefghijklmnopqrstuvwxyz0123456789";
  const generateString = (length = 8) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += ALPHANUMERIC_POOL.charAt(Math.floor(Math.random() * ALPHANUMERIC_POOL.length));
    }
    return result;
  };

  const generateRandomNumber = () => {
    let randomNum = '';
    for (let i = 0; i < 8; i++) {
      randomNum += Math.floor(Math.random() * 10);
    }
    return randomNum;
  };

  const lineCreateLine = async (line) => {
    let res;
    switch (line.protocol) {
      case 'sip':
        res = await lineCreateSip(line)
        break;
      case 'sccp':
        res = await lineCreateSccp(line)
        break;
      case 'custom':
        res = await lineCreateCustom(line)
        break;
      default:
        // code pour les cas non spécifiés
        // console.log('Unknown line type');
        return
    }
    return res
  };

  // create sip line
  const lineCreateSip = async (line) => {
    const name = generateString();
    const password = generateString();
    const lineOptions = {
      caller_id_name: line.caller_id_name,
      caller_id_num: line.new_extensions.exten.toString(),
      context: line.new_extensions.context,
      firstname: line.firstname,
      lastname: line.lastname,
      registrar: line.registrar,
      position: line.position,
      extensions: [
        {
          context: line.new_extensions.context,
          exten: line.new_extensions.exten.toString(),
        },
      ],
      endpoint_sip: {
        auth_section_options: [
          ["username", name],
          ["password", password],
        ],
        label: name,
        name: name,
        templates: line.endpoint.templates,
      },
    };

    const res = await lineAdd(lineOptions);
    return res
  }

  // create sccp line
  const lineCreateSccp = async (line) => {
    const name = generateString();
    const lineOptions = {
      //name: name, 
      //caller_id_name: line.caller_id_name,
      //caller_id_num: line.new_extensions.exten.toString(),
      context: line.new_extensions.context,
      firstname: line.firstname,
      lastname: line.lastname,
      registrar: line.registrar,
      position: line.position,
      protocol: 'sccp'
    };

    const res = await lineAdd(lineOptions);
    const sccpOptions = {
      line: [
        {
          id: res.id,
          name: name
        }
      ],
      options: [
        ["cid_name", name],
        ["cid_num", line.new_extensions.exten.toString()]
      ]
    }
    const sccp = await endpointSccpAdd(sccpOptions)
    await lineEndpointsSccpAssociate(res,sccp)
    const exten = await extensionCreate(line.new_extensions)
    await lineExtensionsAssociate(res, exten)
    return res
  }

  // create custom line
  const lineCreateCustom = async (line) => {
    const lineOptions = {
      //name: name, 
      //caller_id_name: line.caller_id_name,
      //caller_id_num: line.new_extensions.exten.toString(),
      context: line.new_extensions.context,
      firstname: line.firstname,
      lastname: line.lastname,
      registrar: line.registrar,
      position: line.position,
      protocol: 'sccp'
    };

    const res = await lineAdd(lineOptions);

    const intNumber = generateRandomNumber()
    const customOptions = {
      interface: intNumber
    }

    const custom = await endpointCustomAdd(customOptions)
    await lineEndpointsCustomAssociate(res, custom)
    const exten = await extensionCreate(line.new_extensions)
    await lineExtensionsAssociate(res, exten)
    return res
  }

  // update line
  const lineUpdate = async (line) => {
    // Update templates (always)
    await lineUpdateEndpoint(line);

    // Update device (always)
    await lineUpdateDevice(line);

    // Obtenir la ligne actuelle pour comparer
    const lineCurrent = await lineGet(line);

    // Update position
    await lineUpdatePosition(line, lineCurrent);

    // Update extension
    if (line.new_extensions) {
      if (line.extensions[0]?.id) {
        // dissocier device
        if (line.device_id) {
          await lineDeviceDissociate(line, { id: line.device_id });
        }
        // Dissocier line et line.extensions[0]
        await lineExtensionsDissociate(line, line.extensions[0]);
        // Supprimer line.extensions[0]
        await extensionDelete(line.extensions[0]);
      }
      // Créer line.new_extension
      const newExten = await extensionCreate(line.new_extensions);
      // Associer line avec line.new_extension
      await lineExtensionsAssociate(line, newExten);
      // reassocier le device
      if (line.device_id) {
        await lineDeviceAssociate(line, { id: line.device_id });
      }
    }

    // Update application
    await lineUpdateApplication(line, lineCurrent);
  };

  // application
  const lineUpdateApplication = async (line, lineCurrent) => {
    if (lineCurrent.application?.uuid !== line.application?.uuid) {
      if (lineCurrent.application?.uuid) {
        await lineApplicationDissociate(line, lineCurrent.application);
      }
      if (line.application?.uuid) {
        await lineApplicationAssociate(line, line.application);
      }
    }
  };

  // device
  const lineUpdateDevice = async (line) => {
    //obtenir le device actuel de la ligne
    const lineCurrent = await lineDevicesGet(line);

    if (lineCurrent.device_id !== line.device_id) {
      if (lineCurrent.device_id) {
        await lineDeviceDissociate(line, { id: lineCurrent.device_id });
      }
      if (line.device_id) {
        await lineDeviceAssociate(line, { id: line.device_id });
      }
    }
  };

  // endpoint
  const lineUpdateEndpoint = async (line) => {
    if (line.endpoint) {
      if (line.endpoint_custom) {
        await endpointCustomEdit(line.endpoint);
      } else if (line.endpoint_sccp) {
        await endpointSccpEdit(line.endpoint);
      } else if (line.endpoint_sip) {
        await endpointSipEdit(line.endpoint);
      }
    }
  };

  // extension

  // position
  const lineUpdatePosition = async (line, lineCurrent) => {
    if (lineCurrent.position !== line.position) {
      await lineEdit(line);
    }
  };

  return {
    userUpdateLines,
  };
};

export default UserHelperLine;
