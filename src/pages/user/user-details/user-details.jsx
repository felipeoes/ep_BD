import { useContext, useEffect, useState } from "react";
import {
  CameraIcon,
  MainUserDetailsContainer,
  UserInfoContainer,
  UserDetailsContainer,
  UserPhoto,
  UserPhotoText,
  UserPhotoTextContainer,
} from "./styles";
import { UserPhotoContainer } from "./styles";
import { CameraAltOutlined, CameraAlt } from "@mui/icons-material";
import AuthContext from "../../../contexts/auth";
import Loading from "../../../components/loading/Loading";
import cameraIcon from "../../../assets/images/cameraIcon.svg";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { GetUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  async function fetchUser() {
    const currentUser = await GetUser();
    setUser(currentUser);
  }

  return (
    <MainUserDetailsContainer>
      <UserInfoContainer>
        {user && !loading ? (
          <>
            <UserDetailsContainer>
              <UserPhotoContainer>
                <UserPhoto
                  alt="userPicture"
                  src={user.profile_image}
                  className="user-photo"
                />

                <UserPhotoTextContainer>
                  <CameraAlt
                    htmlColor="#252733"
                    className="camera-icon"
                  />
                  <UserPhotoText className="user-photo-text">
                    Alterar foto
                  </UserPhotoText>
                </UserPhotoTextContainer>
              </UserPhotoContainer>
            </UserDetailsContainer>
          </>
        ) : (
          <Loading />
        )}
      </UserInfoContainer>
    </MainUserDetailsContainer>
  );
}
