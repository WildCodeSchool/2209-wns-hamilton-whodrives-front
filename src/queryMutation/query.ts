import { gql } from "@apollo/client";

export const GET_MUSIC_OPTIONS = gql`
  query MusicOptions {
    musicOptions {
      id
      content
    }
  }
`;

export const GET_CHAT_OPTIONS = gql`
  query ChatOptions {
    chatOptions {
      id
      content
    }
  }
`;

export const GET_USER_LOGGED = gql`
  query UserLogged {
    userLogged {
      id
      username
      firstname
      lastname
      date_of_birth
      password
      email
      phone
      cars {
        id
        seat
        model {
          id
          name
        }
        carPictures {
          id
          path
        }
      }
      userInfo {
        id
        city
        country
        address
        about {
          id
          animal
          description
          smoke
          chatOption {
            id
            content
          }
          musicOption {
            id
            content
          }
        }
        profilPictureId {
          id
          path
        }
      }
    }
  }
`;

export const GET_CAR_MODELS = gql`
  query Models {
    Models {
      id
      name
    }
  }
`;

export const GET_USERINFO_LOGGED = gql`
  query UserLogged {
    userLogged {
      id
      username
      firstname
      lastname
      date_of_birth
      password
      email
      phone
      userInfo {
        id
        city
        country
        address
      }
    }
  }
`;

export const GET_ABOUT = gql`
  query About {
    userLogged {
      userInfo {
        about {
          id
          animal
          description
          smoke
          chatOption {
            id
            content
          }
          musicOption {
            id
            content
          }
        }
      }
    }
  }
`;

export const GET_USER_TRIPS = gql`
  query UserTripsLoggedUser {
    UserTripsLoggedUser {
      id
      departure_places
      destination
      date_departure
      arrival_date
      hour_departure
      users {
        username
      }
      passengers {
        username
      }
    }
  }
`;

export const GET_USER_LOGGED_USERNAME = gql`
  query getUserLogged {
    userLogged {
      username
    }
  }
`;
