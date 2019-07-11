/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cardContainer = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/KevinTou")
  .then(res => {
    // console.log("response: ", res.data);
    cardContainer.append(createCard(res.data));
  })
  .catch(err => {
    console.log("Error has occurred: ", err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios
  .get(`https://api.github.com/users/KevinTou/followers`)
  .then(res => {
    // console.log(res.data);
    const followersArray = [];

    res.data.map(user => {
      followersArray.push(user.login);
    });

    return followersArray;
  })
  .then(followers => {
    followers.forEach(follower => {
      axios.get(`https://api.github.com/users/${follower}`).then(res => {
        cardContainer.append(createCard(res.data));
      });
    });
  })
  .catch(err => {
    console.log("Error has occurred: ", err);
  });

// Hardcoded array
// const followersArray = [
//   "tetondan",
//   "dustinmyers",
//   "justsml",
//   "luishrd",
//   "bigknell"
// ];

// followersArray.map(user => {
//   axios.get(`https://api.github.com/users/${user}`).then(res => {
//     cardContainer.append(createCard(res.data));
//   });
// });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(user) {
  // Create card structure
  const card = document.createElement("div");
  const userImage = document.createElement("img");
  const cardInfo = document.createElement("div");
  const userName = document.createElement("h3");
  const userUsername = document.createElement("p");
  const userLocation = document.createElement("p");
  const userProfile = document.createElement("p");
  const userProfileLink = document.createElement("a");
  const userFollowers = document.createElement("p");
  const userFollowing = document.createElement("p");
  const userBio = document.createElement("p");

  // Add classes
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  userName.classList.add("name");
  userUsername.classList.add("username");

  // Add content to card
  userImage.src = user.avatar_url;
  userName.textContent = user.name;
  userUsername.textContent = user.login;
  userLocation.textContent = user.location
    ? `Location: ${user.location}`
    : `Location: N/A`;
  userProfile.textContent = "Profile: ";
  userProfileLink.href = user.html_url;
  userProfileLink.textContent = user.html_url;
  userFollowers.textContent = `Followers: ${user.followers}`;
  userFollowing.textContent = `Following: ${user.following}`;
  userBio.textContent = user.bio ? `Bio: ${user.bio}` : `Bio: N/A`;

  // Append after adding content
  card.append(userImage);
  card.append(cardInfo);

  cardInfo.append(userName);
  cardInfo.append(userUsername);
  cardInfo.append(userLocation);
  cardInfo.append(userProfile);
  cardInfo.append(userFollowers);
  cardInfo.append(userFollowing);
  cardInfo.append(userBio);

  userProfile.append(userProfileLink);

  // Return populated card
  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
