import { gql } from "@apollo/client";

export const GET_MUSIC_OPTIONS = gql`
  query GetMusicOptions {
    getMusicOptions {
      id
      content
    }
  }
`;

export const GET_CHAT_OPTIONS = gql`
  query GetChatOptions {
    getChatOptions {
      id
      content
    }
  }
`;

export const GET_USER_LOGGED = gql`
  query UserLogged {
    getUserLogged {
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
        brand {
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
          cigarette
          chatOption {
            id
            content
          }
          musicOption {
            id
            content
          }
        }
        profilePicture {
          id
          path
        }
      }
    }
  }
`;
export const GET_USER_PICTURES = gql`
  query getProfilePicturePath {
    getProfilePicturePath
  }
`;

export const GET_ID_USERINFO = gql`
  query UserLogged {
    getUserLogged {
      userInfo {
        id
      }
    }
  }
`;
export const GET_PROFILE_USER = gql`
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
        brand {
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
          cigarette
          chatOption {
            id
            content
          }
          musicOption {
            id
            content
          }
        }
        profilePictureId {
          id
          path
        }
      }
    }
  }
`;

export const GET_CAR_BRANDS = gql`
  query GetBrands {
    getBrands {
      id
      name
    }
  }
`;
export const GET_CAR_USER_LOGGED = gql`
  query GetCarUserLogged {
    getUserLogged {
      cars {
        id
        brand {
          id
          name
        }
        seat
      }
    }
  }
`;

export const GET_USERINFO_LOGGED = gql`
  query UserLogged {
    getUserLogged {
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
  query GetAboutById {
    getUserLogged {
      userInfo {
        about {
          id
          animal
          description
          cigarette
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
