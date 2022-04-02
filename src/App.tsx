import './App.css';
import { AnalysisValues } from './components/AnalysisValues';
import { Header } from './components/Header';
import { ProcessBar } from './components/ProcessBar';
import { useState } from 'react';
import { Configuration, GeoMap, Party, Algorithm, Districts } from './types';
import { SvgMap } from './components/SvgMap';

export const parties: Party[] = [
  {
    name: "Yellow Party",
    color: "fill-yellow-500",
  }, {
    name: "Blue Party",
    color: "fill-blue-500",
  }
]

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
