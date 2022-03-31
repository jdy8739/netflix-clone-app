import { ISearchedResult } from "../searchApi";
import { makeImagePath } from "../utils";
import { ModalImage, ModalInfo, Overview, Title } from "./Modal";

function SearchModal({ clicked }: { clicked: ISearchedResult }) {
    return (
        <>
            <ModalInfo>
                <ModalImage 
                path={
                    clicked.backdrop_path ?
                    makeImagePath(String(clicked.backdrop_path), 'w500') :
                    clicked.poster_path ?
                    makeImagePath(String(clicked.poster_path)) :
                    makeImagePath(String(clicked.profile_path))
                }>
                    <Title>{ clicked.title || clicked.name }</Title>
                </ModalImage>
                <Overview>
                    { 
                        clicked?.overview && clicked?.overview?.length > 400 ? 
                        clicked?.overview.slice(0, 420) + '...' : clicked?.overview
                    }
                </Overview>
            </ModalInfo>
        </>
    )
};

export default SearchModal;