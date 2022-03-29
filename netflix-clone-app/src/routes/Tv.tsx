import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { bannerAtom, tvBannerAtom } from "../atoms";
import SliderListTv from "../components/SliderListTv";
import { makeImagePath } from "../utils";
import { Banner, Overview, Title } from "./Home";

function Tv() {

    const banner = useRecoilValue(tvBannerAtom);

    return (
        <>  
            <Banner 
                path={makeImagePath(banner ? banner.backdrop_path : '')}>
                    <div>
                        <Title>{ banner ? banner.name : '' }</Title>
                        <Overview>{ banner ? banner.overview : '' }</Overview>
                        <br></br>
                        <button>click</button>
                    </div>
            </Banner>
            <SliderListTv theme={'tv_popular'} position={'150px'}/>
        </>
    )
};

export default Tv;