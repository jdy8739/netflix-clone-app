import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { movieAtom } from "../atoms";
import { classifyGenres, makeImagePath } from "../utils";

export const PlayBtn = styled.img`
    width: 75px;
    height: 75px;
    opacity: 0.6;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transition: opacity 0.5;
`;

export const ModalInfo = styled.div`
    background-color: rgb(34, 34, 36);
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
`;

export const ModalImage = styled.div<{ path: string }>`
    background-image: linear-gradient(to top, black, transparent), url(${props => props.path});
    width: 100%;
    height: 70%;
    background-position: center center;
    background-size: cover;
    position: relative;
    &:hover {
        ${PlayBtn} {
            opacity: 1;
        }
    }
`;

export const Title = styled.h1`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
`;

export const Overview = styled.div`
    padding: 12px;
`;

export const Genres = styled.div`
    position: absolute;
    top: 0px;
    right: 8px;
    text-align: right;
`;

export const GenreBadge = styled.span`
    background-color: red;
    border-radius: 3px;
    padding: 3px;
    font-size: 10px;
`;

export const ReleaseDate = styled.p`
    background-color: rgba(73, 73, 73, 0.5);
    position: absolute;
    top: -5px;
    left: 8px;
    text-align: left;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 5px;
    font-weight: bold;
`;

export const Popularity = styled.p`
    font-size: 13px;
    position: absolute;
    bottom: 0;
    right: 10px;
`;

function Modal() {

    const selectedMovie = useRecoilValue(movieAtom);

    return (
        <ModalInfo>
            <ModalImage path={makeImagePath(selectedMovie?.backdrop_path || '')}>
                <PlayBtn src={require('../img/play_btn.png')} />
                <Title>{ selectedMovie?.title }</Title>
            </ModalImage>
            <Genres>
                    {
                        selectedMovie?.genre_ids.map((genre) => {
                            return (
                                <div 
                                key={ genre }
                                style={{
                                    marginTop: '5px'
                                }}
                                >
                                    <GenreBadge>{ classifyGenres(genre) }</GenreBadge>
                                </div>
                            )
                        }) 
                    }
            </Genres>
            <ReleaseDate>released: { selectedMovie?.release_date }</ReleaseDate>
            <Overview>
                { 
                    selectedMovie?.overview && selectedMovie?.overview?.length > 380 ? 
                    selectedMovie?.overview.slice(0, 400) + '...' : selectedMovie?.overview
                }
                <Popularity>💕{ selectedMovie?.popularity }</Popularity>
            </Overview>
        </ModalInfo>
    )
};

export default Modal;