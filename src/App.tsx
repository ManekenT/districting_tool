import './App.css';
import { AnalysisValues } from './components/Metrics/AnalysisValues';
import { Header } from './components/UI/Header';
import { useState } from 'react';
import { Algorithm } from './types';
import { SvgMap } from './components/Map/SvgMap';
import { GeoMap } from './classes/GeoMap';
import { DistrictSchema } from './classes/DistrictSchema';
import { Title } from './components/UI/Title';
import { UploadStep } from './components/DistrictingSteps/UploadStep';
import { AlgorithmStep } from './components/DistrictingSteps/AlgorithmStep';
import { WeightingStep } from './components/DistrictingSteps/WeightingStep';
import { GeneratingStep } from './components/DistrictingSteps/GeneratingStep';
import { ConstraintStep } from './components/DistrictingSteps/ConstraintsStep';
import { doSimulatedAnnealing } from './util/simulatedAnnealing';

export const algorithms: Algorithm[] = [{
  name: "Simulated Annealing",
  algorithm: doSimulatedAnnealing,
}]


function App() {

  const [map, setMap] = useState<GeoMap>()
  const [showNewMap, setShowNewMap] = useState(false)

  const [algorithm, setAlgorithm] = useState<Algorithm>()

  const [compactness, setCompactness] = useState<number>()
  const [populationEquality, setPopulationEquality] = useState<number>()
  const [efficiencyGap, setEfficiencyGap] = useState<number>()

  const [contiguity, setContiguity] = useState<boolean>()
  const [keepDistrictCount, setKeepDistrictCount] = useState<boolean>()

  const [districtsOld, setDistrictsOld] = useState<DistrictSchema>()
  const [districtsNew, setDistrictsNew] = useState<DistrictSchema>()

  function updateState(updateFunction: (value: any) => void) {
    return (value: any) => {
      updateFunction(value);
      setDistrictsNew(undefined)

    }
  }

  function updateDistrictsNew(districts: DistrictSchema) {
    setDistrictsNew(districts);
    setShowNewMap(true);
  }

  function updateMap(map: GeoMap) {
    setMap(map);
    setShowNewMap(false);
  }

  return <>
    <Header />
    <div className='flex text-slate-50 bg-slate-600'>
      <div className="w-1/6 h-screen">
        <Title title="Anleitung" />
        <UploadStep map={map} districtsOld={districtsOld} setMap={updateState(updateMap)} setDistrictsOld={updateState(setDistrictsOld)} />
        <AlgorithmStep algorithm={algorithm} setAlgorithm={updateState(setAlgorithm)} />
        <WeightingStep compactness={compactness} populationEquality={populationEquality} efficiencyGap={efficiencyGap} setCompactness={updateState(setCompactness)} setPopulationEquality={updateState(setPopulationEquality)} setEfficiencyGap={updateState(setEfficiencyGap)} />
        <ConstraintStep contiguity={contiguity} keepDistrictCount={keepDistrictCount} setContiguity={updateState(setContiguity)} setKeepDistrictCount={updateState(setKeepDistrictCount)} />
        <GeneratingStep
          setDistrictsNew={updateDistrictsNew}
          map={map}
          algorithm={algorithm}
          compactness={compactness}
          populationEquality={populationEquality}
          efficiencyGap={efficiencyGap}
          contiguity={contiguity}
          keepDistrictCount={keepDistrictCount}
          districtsOld={districtsOld}
          districtsNew={districtsNew} />
      </div>
      <SvgMap map={map} showNewDistricts={showNewMap} setShowNewDistricts={setShowNewMap} setNewDistricts={updateDistrictsNew} districtsOld={districtsOld} districtsNew={districtsNew} />
      <AnalysisValues map={map} districtsOld={districtsOld} districtsNew={districtsNew} />
    </div>
  </>
}

export default App;
