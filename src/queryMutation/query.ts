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
  query getUserLogged {
    userLogged {
      username
      password
      firstname
      lastname
      date_of_birth
      email
      phone
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
        profilPictureId
      }
      cars {
        carPictures {
          path
          id
        }
        id
        model {
          id
          name
        }
        seat
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
