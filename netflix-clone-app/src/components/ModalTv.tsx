import { useRecoilValue } from "recoil";
import { tvAtom } from "../atoms";
import { classifyGenres, makeImagePath } from "../utils";
import { GenreBadge, Genres, ModalImage, ModalInfo, Overview, PlayBtn, Popularity, ReleaseDate, Title } from "./Modal";

function ModalTv() {

    const selectedTv = useRecoilValue(tvAtom);

    return (
        <ModalInfo>
            <ModalImage path={makeImagePath(selectedTv?.backdrop_path || '')}>
                <PlayBtn src={require('../img/play_btn.png')} />
                <Title>{ selectedTv?.name }</Title>
            </ModalImage>
            <Genres>
                {
                    selectedTv?.genre_ids.map((genre) => {
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
            <ReleaseDate>first aired: { selectedTv?.first_air_date }</ReleaseDate>
            <Overview>
                { 
                    selectedTv?.overview && selectedTv?.overview?.length > 380 ? 
                    selectedTv?.overview.slice(0, 400) + '...' : selectedTv?.overview
                }
                <Popularity>💕{ selectedTv?.popularity }</Popularity>
            </Overview>
        </ModalInfo>
    )
};

export default ModalTv;