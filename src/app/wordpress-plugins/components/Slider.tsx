import { Slider } from '@mui/material';
export const SliderCtn = ({
  //@ts-ignore
  handleSliderValue,
  //@ts-ignore

  value,
  //@ts-ignore

  step,
  //@ts-ignore

  name,
  //@ts-ignore

  min,
  //@ts-ignore

  max,
}) => {
  return (
    <Slider
      sx={{
        '& .MuiSlider-thumb': {
          border: '1.5px solid #0000001A',
          background: 'white',
        },
        '& .MuiSlider-root': {
          background: '#3339F1',
        },
        '& .MuiSlider-rail': {
          background: '#eae9e9',
        },
        color: '#3339F1',
        height: '6px',
      }}
      value={value ? value : [0, 0]}
      onChange={handleSliderValue}
      name={name}
      step={step}
      min={min}
      max={max}
    />
  );
};
