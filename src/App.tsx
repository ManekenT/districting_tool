import './App.css';
import { AnalysisValues } from './components/Metrics/AnalysisValues';
import { Header } from './components/UI/Header';
import { ProcessBar } from './components/DistrictingSteps/ProcessBar';
import { useState } from 'react';
import { Configuration, GeoMap, Algorithm, Districts, Parties } from './types';
import { SvgMap } from './components/Map/SvgMap';

export const parties: Parties = {
  yellow: {
    name: "Yellow Party",
    color: "fill-yellow-500",
  },
  blue: {
    name: "Blue Party",
    color: "fill-blue-500",
  }
}

export const algorithms: Algorithm[] = [{
  name: "Simulated Annealing",
  algorithm: () => [],
},
{
  name: "Anderer Algorithmus",
  algorithm: () => [],
}]


function App() {

  const [map, setMap] = useState<GeoMap>()
  const [configuration, setConfiguration] = useState<Configuration>({
    weightingValues: {
      contiguity: 0,
      compactness: 0,
      populationEquality: 0
    }
  })
  const [districtsOld, setDistrictsOld] = useState<Districts>()
  const [districtsNew, setDistrictsNew] = useState<Districts>()

  function onUploadDone(map: GeoMap, districts: Districts) {
    setMap(map);
    setDistrictsOld(districts)
    setDistrictsNew(undefined);
  }

  function onConfigurationDone(configuration: Configuration) {
    setConfiguration(configuration);
    setDistrictsNew(undefined)
  }

  function onGeneratingDone(districts: Districts) {
    setDistrictsNew(districts);
  }

  return <>
    <Header />
    <div className='flex text-slate-50'>
      <ProcessBar onUploadDone={onUploadDone} onConfigurationDone={onConfigurationDone} onGeneratingDone={onGeneratingDone} map={map} districtsOld={districtsOld} configuration={configuration} districtsNew={districtsNew} />
      <SvgMap map={map} districtsOld={districtsOld} districtsNew={districtsNew} />
      <AnalysisValues map={map} districtsOld={districtsOld} districtsNew={districtsNew} />
    </div>
  </>
}

export default App;
