import { gql } from "@apollo/client";

export const GET_MUSIC_OPTIONS = gql`
  query GetMusicOptions {
    musicOptions {
      id
      content
    }
  }
`;

export const GET_CHAT_OPTIONS = gql`
  query GetChatOptions {
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
        profilPicture {
          id
          path
        }
      }
    }
  }
`;
export const GET_USER_PICTURES = gql`
  query Query {
    profilePicturePath
  }
`;

export const GET_ID_USERINFO = gql`
  query UserLogged {
    userLogged {
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
        profilPictureId {
          id
          path
        }
      }
    }
  }
`;

export const GET_CAR_BRANDS = gql`
  query GetBrands {
    Brands {
      id
      name
    }
  }
`;
export const GET_CAR_USER_LOGGED = gql`
  query GetCarUserLogged {
    userLogged {
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
  query GetAboutById {
    userLogged {
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
