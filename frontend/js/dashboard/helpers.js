import { TIMEOUT_SEC, FUSE_OPTIONS } from './config.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const formatDate = inputDate => {
  // Parse input date string into a Date object
  const date = new Date(inputDate);

  // Extract year, month, and day
  const year = date.getFullYear();
  // Months are zero-based, so add 1 to get the correct month
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date in the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

// export const AJAX = async function (url, uploadData = undefined) {
//   try {
//     const fetchPro = uploadData
//       ? fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(uploadData),
//         })
//       : fetch(url);

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const getJSON = async function (url) {
//   try {
//     console.log('getJSON executing ...');
//     // console.log(localStorage.getItem('JWT'));
//     const fetchPro = fetch(url, {
//       method: 'GET',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//         'content-Type': 'application/json',
//       },
//     });
//     // console.log(fetchPro);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // console.log(res);
//     const data = await res.json();
//     // console.log(data);
//     // localStorage.setItem('JWT', data.jwt);
//     if (!res.ok)
//       throw new Error(`${data.error} (${res.statusText} - ${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const te

export const getJSON = async function (url) {
  try {
    console.log('getJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'content-Type': 'application/json',
        },
      }),
      timeout(TIMEOUT_SEC),
    ]);

    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: localStorage.getItem('JWT'),
    //     'content-Type': 'application/json',
    //   },
    // });
    const data = await res.json();
    // console.log(data);
    // console.log(res);
    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const getJSONBody = async function (url, uploadData) {
  try {
    console.log('getJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: localStorage.getItem('JWT'),
    //     'content-Type': 'application/json',
    //   },
    // });
    const data = await res.json();
    // console.log(data);
    // console.log(res);
    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    console.log('sendJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const putJSON = async function (url, uploadData) {
  try {
    console.log('putJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const delJSON = async function (url, uploadData) {
  try {
    console.log('delJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const delJSONReturnResResp = async function (url, uploadData) {
  // try {
  console.log('delJSONReturn');
  const res = await Promise.race([
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }),
    timeout(TIMEOUT_SEC),
  ]);
  const data = await res.json();
  // console.log(data);
  return [res, data];
  // if (!res.ok) throw new Error(`${data.message} (${res.status}`);
  // return data;
  // } catch (err) {
  // throw err;
  // }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     console.log(data);

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const putJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'PUT',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const truncateEmail = function (email) {
  const formatWord = function (word) {
    return word.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  // split the email address at the @ symbol
  let parts = email.split('@');
  // set the part before the @ symbol
  let truncatedPart = parts[0];
  truncatedPart = formatWord(truncatedPart);
  return truncatedPart;
};
export const capitalizeWord = function (word) {
  return word.toUpperCase();
};
export const capitalizeFirstLetter = function (word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
export const roleTranslator = function (RoleInTheBackend) {
  switch (RoleInTheBackend) {
    case 'Service achat':
      return 'S. Achat';
    case 'Magasinier':
      return 'Magasinier';
    case 'Directeur':
      return 'Directeur';
    case 'SG':
      return 'SG';
    case 'Responsable directe':
      return 'Resp. Direct';
    case 'Consommateur':
      return 'Consommateur';
    case 'Administrateur System':
      return 'Administrateur';
  }
};

// fuzzySearchFunctionMaker:
export const fuzzySearch = (list, keys = []) => {
  const fuse = new Fuse(list, { ...FUSE_OPTIONS, keys });
  return pattern => fuse.search(pattern);
};

export const findNodeIndex = function (nodeList, targetNode) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i] === targetNode) {
      return i; // Return the index if the node matches the target node
    }
  }
  return -1; // Return -1 if the target node is not found in the NodeList
};

export const getUpdateObject = function (oldObj, newObj) {
  const updateObj = {};

  // Iterate through properties of the new object
  for (const key in newObj) {
    // Check if the property exists in the old object and has a different value
    if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
      // Add the property to the update object with the new value
      updateObj[key] = newObj[key];
    }
  }

  return updateObj;
};

export const removeUndefinedProperties = function (obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export const removeChildrenFromSecond = function (element) {
  if (element.children.length >= 2) {
    for (let i = element.children.length - 1; i >= 1; i--) {
      element.removeChild(element.children[i]);
    }
  }
};
export const getCheckboxStates = function (checkboxes) {
  const checkboxStates = [];
  checkboxes.forEach(function (checkbox) {
    checkboxStates.push(checkbox.checked);
  });
  return checkboxStates;
};
export const setCheckboxStates = function (nodeList, booleanArray) {
  nodeList.forEach((checkbox, index) => {
    checkbox.checked = booleanArray[index];
  });
};

export const checkSpecialArray = function (nodeList, specialArray) {
  const result = [];
  nodeList.forEach(checkbox => {
    result.push(specialArray.includes(checkbox.name));
  });
  return result;
};

export const compareAndGetUpdates = function (oldArray, newArray) {
  const resultObj = {
    add: [],
    delete: [],
  };
  oldArray.forEach((value, index) => {
    resultObj.add.push(newArray[index] && !value);
    resultObj.delete.push(!newArray[index] && value);
  });
  return resultObj;
};

export const filterNodeList = function (nodeList, booleanArray) {
  const filteredArray = [];
  nodeList.forEach((node, index) => {
    if (booleanArray[index]) {
      filteredArray.push(node);
    }
  });
  return filteredArray;
};
export const compareBooleanArrays = function (array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
};

export const getPermissions = function (roles = [], designation) {
  const role = roles.find(role => role.role === designation);
  if (role) {
    return role.droits;
  } else {
    return 'Role not found';
  }
};

export const includesDesignation = (objectsArray, searchString) => {
  return objectsArray.some(obj => obj.designation.includes(searchString));
};

export const filterByArticle = (array, articleName) => {
  return array.filter(obj => obj.article === articleName);
};

export const removeElements = (originalArray, partialArray) => {
  // Create a set of unique identifiers from the partial array
  const partialSet = new Set(partialArray.map(obj => JSON.stringify(obj)));

  // Filter out elements from the original array that exist in the partial array
  return originalArray.filter(obj => !partialSet.has(JSON.stringify(obj)));
};
export const removeArrayByBooleans = (dataArray, booleanArray) => {
  const filteredArray = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (!booleanArray[i]) {
      filteredArray.push(dataArray[i]);
    }
  }
  return filteredArray;
};
export const getFormattedDate = () => {
  const today = new Date();

  const year = today.getFullYear();

  // JavaScript months are zero-based, so we add 1 to get the correct month
  const month = (today.getMonth() + 1).toString().padStart(2, '0');

  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
export const renderError = function (heading, content) {
  console.log('RENDING AN ERROR');
  const container = document.querySelector('.error-message-container');
  const hideWindow = () => {
    container.classList.add('hidden');
    document.querySelector('.overlayError').classList.add('hidden');
  };
  //reset the window
  document.querySelector('.heading-error-message').innerHTML = '';
  document.querySelector('.error-content').innerHTML = '';
  //show the window (somehow)
  container.classList.remove('hidden');
  document.querySelector('.overlayError').classList.remove('hidden');
  //adding content
  document.querySelector('.heading-error-message').innerHTML = heading;
  document.querySelector('.error-content').innerHTML = content;
  //add closing ELs
  container.querySelector('.close-btn').addEventListener('click', hideWindow);
  document.querySelector('.overlayError').addEventListener('click', hideWindow);
};