export function makeRequest(type, uri, data) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open(type, uri);

    req.onload = function() {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
        console.timeEnd("timer")
      } else {
        reject(this.error);
      }
    };

    if (data) {
      req.setRequestHeader("Content-Type",  "application/json");
      req.send(JSON.stringify(data));
    } else {
      req.send();
    }
    console.time("timer");
  });
}

export function checkMatch(currentCategories, newTitle, newHTML) {
  return makeRequest("POST", "https://api.deepmode.app/match", {
    currentCategories: currentCategories,
    title: newTitle,
    html: newHTML
  });
}

export function getCategorySetForTask(taskDescription) {
  return makeRequest(
    "GET",
    encodeURI(
      "https://api.deepmode.app/categorySet?task_description=" +
      taskDescription
    )
  );
}

export function parseArticle(url) {
  return makeRequest(
    "GET",
    encodeURI(
      "https://api.deepmode.app/parse?url=" + url
    )
  );
}

export function analysePage(url) {
  return makeRequest(
    "GET",
    "https://api.diffbot.com/v3/analyze?token=5afe5c8cabb314a035a88f2c8cc6c16d&url=" + encodeURIComponent(url)
  );
}

export function analysePageOutline(url) {
  return makeRequest(
    "GET",
    `https://outlineapi.com/v3/parse_article?source_url=${url}`
  );
}

export function onAuth(protagonist) {
  return makeRequest(
    "POST",
    "https://api.deepmode.app/auth",
    protagonist
  );
}

export function addRecentTask(protagonistID, description, categories) {
  return makeRequest(
    "POST",
    "https://api.deepmode.app/task",
    { protagonistID, description, categories }
  );
}

export function updateBlacklist(protagonistID, blacklist) {
  return makeRequest(
    "POST",
    `https://api.deepmode.app/protagonist/${protagonistID}/blacklist`,
    { blacklist }
  );
}

export function updateWhitelist(protagonistID, whitelist) {
  return makeRequest(
    "POST",
    `https://api.deepmode.app/protagonist/${protagonistID}/whitelist`,
    { whitelist }
  );
}
