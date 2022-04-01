import styled from "styled-components";
import { ISearchedResult } from "../searchApi";
import { classifyGenres, makeImagePath } from "../utils";
import { GenreBadge, Genres, ModalImage, ModalInfo, Overview, PlayBtn, Popularity, ReleaseDate, Title } from "./Modal";

const WorkBadge = styled.div`
    border: 1px solid rgb(139, 139, 139);
    border-radius: 8px;
    padding: 6px;
    margin: 8px;
    text-align: right;
    display: inline-block;
`;

function SearchModal({ clicked }: { clicked: ISearchedResult }) {
    return (
        <>
            <ModalInfo>
                <ModalImage 
                path={
                    clicked.backdrop_path ?
                    makeImagePath(String(clicked.backdrop_path)) :
                    clicked.poster_path ?
                    makeImagePath(String(clicked.poster_path)) :
                    makeImagePath(String(clicked.profile_path))
                }>  
                    {
                        clicked.genre_ids ? <PlayBtn src={require('../img/play_btn.png')} /> : null
                    }
                    <Title>{ clicked.title || clicked.name }</Title>
                </ModalImage>
                {
                    !clicked.genre_ids ? null :
                    <Genres>
                        {
                            clicked?.genre_ids.map((genre) => {
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
                }
                {
                    clicked.release_date || clicked.first_air_date ? 
                    <ReleaseDate>
                        { 
                            clicked.release_date ? 
                            "released: " + clicked.release_date : 
                            "first aired: " + clicked.first_air_date 
                        }
                    </ReleaseDate> : null
                }
                <Overview>
                    { 
                        clicked?.overview && clicked?.overview?.length > 400 ? 
                        clicked?.overview.slice(0, 420) + '...' : clicked?.overview
                    }
                    {
                        clicked.known_for ? 
                        clicked.known_for.map((work, i) => {
                            return (
                                <WorkBadge key={i}>{ work.title || work.name }</WorkBadge>
                            )
                        }) 
                        : null
                    }
                    <Popularity>💕{ clicked?.popularity }</Popularity>
                </Overview>
            </ModalInfo>
        </>
    )
};

export default SearchModal;