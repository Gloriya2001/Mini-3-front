import React from 'react';

const TeethDiagram = ({ selectedTeeth ,shades}) => {
    return (
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 100 1000 1000" width="800" height="800">

        {/* <!-- Upper Teeth (Arcada Superior) -->
        <!-- Central Incisors --> */}
        <g class="tooth upper-tooth" id="upper-tooth-11"  >
          <path  d="M350 400 Q 370 370, 390 400 T 410 440 Q 390 460, 370 440 Q 350 420, 350 400 Z" fill={selectedTeeth.includes('11') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="360" y="380" fontSize="12" textAnchor="middle">11</text>
        </g>
        <g  class="tooth upper-tooth" id="upper-tooth-12">
          <path id="21"  d="M410 400 Q 430 370, 450 400 T 470 440 Q 450 460, 430 440 Q 410 420, 410 400 Z" fill={selectedTeeth.includes('21') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="420" y="380" fontSize="12"textAnchor="middle">21</text>
        </g>
      
        {/* <!-- Lateral Incisors --> */}
        <g  class="tooth upper-tooth" id="upper-tooth-13">
          <path id="12"  d="M310 410 Q 330 380, 350 410 T 370 450 Q 350 470, 330 450 Q 310 430, 310 410 Z" fill={selectedTeeth.includes('12') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="320" y="390" fontSize="12"textAnchor="middle">12</text>
        </g>
        <g class="tooth upper-tooth" id="upper-tooth-14">
          <path id="22"   d="M450 410 Q 470 380, 490 410 T 510 450 Q 490 470, 470 450 Q 450 430, 450 410 Z" fill={selectedTeeth.includes('22') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="460" y="390" fontSize="12"textAnchor="middle">22</text>
        </g>
      
        {/* <!-- Canines --> */}
        <g  class="tooth upper-tooth" id="upper-tooth-15">
          <path  id="13"  d="M270 420 Q 290 390, 310 420 T 330 460 Q 310 480, 290 460 Q 270 440, 270 420 Z" fill={selectedTeeth.includes('13') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="280" y="400" fontSize="12"textAnchor="middle">13</text>
        </g>
        <g class="tooth upper-tooth" id="upper-tooth-16">
          <path id="23"   d="M490 420 Q 510 390, 530 420 T 550 460 Q 530 480, 510 460 Q 490 440, 490 420 Z" fill={selectedTeeth.includes('23') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="500" y="400" fontSize="12"textAnchor="middle">23</text>
        </g>
      
        {/* <!-- First Premolars --> */}
        <g  class="tooth upper-tooth" id="upper-tooth-17">
          <path  id="14"  d="M230 430 Q 250 410, 270 430 T 290 470 Q 270 490, 250 470 Q 230 450, 230 430 Z"fill={selectedTeeth.includes('14') ? 'blue' : '#ffffff'}stroke="#000" stroke-width="1"/>
          <text x="240" y="410" fontSize="12"textAnchor="middle">14</text>
        </g>
        <g  class="tooth upper-tooth" id="upper-tooth-18">
          <path id="24"   d="M530 430 Q 550 410, 570 430 T 590 470 Q 570 490, 550 470 Q 530 450, 530 430 Z" fill={selectedTeeth.includes('24') ? 'blue' : '#ffffff'}stroke="#000" stroke-width="1"/>
          <text x="540" y="410" fontSize="12"textAnchor="middle">24</text>
        </g>
      
        {/* <!-- Second Premolars --> */}
        <g  class="tooth upper-tooth" id="upper-tooth-21">
          <path  id="15"  d="M210 440 Q 230 420, 250 440 T 270 480 Q 250 500, 230 480 Q 210 460, 210 440 Z" fill={selectedTeeth.includes('15') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="220" y="420" fontSize="12"textAnchor="middle">15</text>
        </g>
        <g  class="tooth upper-tooth" id="upper-tooth-22">
          <path id="25"   d="M550 440 Q 570 420, 590 440 T 610 480 Q 590 500, 570 480 Q 550 460, 550 440 Z" fill={selectedTeeth.includes('25') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="575" y="415" fontSize="12"textAnchor="middle">25</text>
        </g>
      
        {/* <!-- First Molars --> */}
        <g class="tooth upper-tooth" id="upper-tooth-23">
          <path id="16"   d="M190 450 Q 210 430, 230 450 T 250 490 Q 230 510, 210 490 Q 190 470, 190 450 Z"fill={selectedTeeth.includes('16') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="200" y="430" fontSize="12"textAnchor="middle">16</text>
        </g>
        <g class="tooth upper-tooth" id="upper-tooth-24">
          <path id="26"   d="M570 450 Q 590 430, 610 450 T 630 490 Q 610 510, 590 490 Q 570 470, 570 450 Z" fill={selectedTeeth.includes('26') ? 'blue' : '#ffffff'}stroke="#000" stroke-width="1"/>
          <text x="600" y="429" fontSize="12"textAnchor="middle">26</text>
        </g>
      
        {/* <!-- Second Molars --> */}
        <g  class="tooth upper-tooth" id="upper-tooth-25">
          <path id="17"   d="M170 460 Q 190 440, 210 460 T 230 500 Q 210 520, 190 500 Q 170 480, 170 460 Z" fill={selectedTeeth.includes('17') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="180" y="440" fontSize="12"textAnchor="middle">17</text>
        </g>
        <g class="tooth upper-tooth" id="upper-tooth-26">
          <path  id="27"  d="M590 460 Q 610 440, 630 460 T 650 500 Q 630 520, 610 500 Q 590 480, 590 460 Z" fill={selectedTeeth.includes('27') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="620" y="435" fontSize="12"textAnchor="middle">27</text>
        </g>
      
        {/* <!-- Third Molars --> */}
        <g class="tooth upper-tooth" id="upper-tooth-27">
          <path  id="18"  d="M150 470 Q 170 450, 190 470 T 210 510 Q 190 530, 170 510 Q 150 490, 150 470 Z" fill={selectedTeeth.includes('18') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="160" y="450" fontSize="12"textAnchor="middle">18</text>
        </g>
        <g  class="tooth upper-tooth" id="upper-tooth-28">
          <path id="28"   d="M610 470 Q 630 450, 650 470 T 670 510 Q 650 530, 630 510 Q 610 490, 610 470 Z" fill={selectedTeeth.includes('28') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="640" y="450" fontSize="12"textAnchor="middle">28</text>
        </g>
      
        {/* <!-- Lower Teeth (Arcada Inferior) -->
        <!-- Central Incisors --> */}
        <g class="tooth lower-tooth" id="lower-tooth-31">
          <path id="31"   d="M350 600 Q 370 580, 390 600 T 410 640 Q 390 660, 370 640 Q 350 620, 350 600 Z" fill={selectedTeeth.includes('31') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="360" y="580" fontSize="12"textAnchor="middle">31</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-41">
          <path id="41"   d="M410 600 Q 430 580, 450 600 T 470 640 Q 450 660, 430 640 Q 410 620, 410 600 Z" fill={selectedTeeth.includes('41') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="420" y="580" fontSize="12"textAnchor="middle">41</text>
        </g>
      
        {/* <!-- Lateral Incisors --> */}
        <g class="tooth lower-tooth" id="lower-tooth-32">
          <path id="32"   d="M310 610 Q 330 590, 350 610 T 370 650 Q 350 670, 330 650 Q 310 630, 310 610 Z" fill={selectedTeeth.includes('32') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="320" y="590" fontSize="12"textAnchor="middle">32</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-42">
          <path id="42"   d="M450 610 Q 470 590, 490 610 T 510 650 Q 490 670, 470 650 Q 450 630, 450 610 Z" fill={selectedTeeth.includes('42') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="470" y="590" fontSize="12"textAnchor="middle">42</text>
        </g>
      
        {/* <!-- Canines --> */}
        <g class="tooth lower-tooth" id="lower-tooth-33">
          <path  id="33"  d="M270 620 Q 290 590, 310 620 T 330 660 Q 310 680, 290 660 Q 270 640, 270 620 Z" fill={selectedTeeth.includes('33') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="280" y="600" fontSize="12"textAnchor="middle">33</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-43">
          <path  id="43"  d="M490 620 Q 510 590, 530 620 T 550 660 Q 530 680, 510 660 Q 490 640, 490 620 Z" fill={selectedTeeth.includes('43') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="515" y="600" fontSize="12"textAnchor="middle">43</text>
        </g>
      
        {/* <!-- First Premolars --> */}
        <g class="tooth lower-tooth" id="lower-tooth-34">
          <path  id="34"  d="M230 630 Q 250 610, 270 630 T 290 670 Q 270 690, 250 670 Q 230 650, 230 630 Z" fill={selectedTeeth.includes('34') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="240" y="610" fontSize="12"textAnchor="middle">34</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-44">
          <path id="44"   d="M530 630 Q 550 610, 570 630 T 590 670 Q 570 690, 550 670 Q 530 650, 530 630 Z" fill={selectedTeeth.includes('44') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="550" y="610" fontSize="12"textAnchor="middle">44</text>
        </g>
      
        {/* <!-- Second Premolars --> */}
        <g class="tooth lower-tooth" id="lower-tooth-35">
          <path id="35"   d="M210 640 Q 230 620, 250 640 T 270 680 Q 250 700, 230 680 Q 210 660, 210 640 Z" fill={selectedTeeth.includes('35') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="220" y="620" fontSize="12"textAnchor="middle">35</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-45">
          <path  id="45"  d="M550 640 Q 570 620, 590 640 T 610 680 Q 590 700, 570 680 Q 550 660, 550 640 Z" fill={selectedTeeth.includes('45') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="580" y="620" fontSize="12"textAnchor="middle">45</text>
        </g>
      
        {/* <!-- First Molars --> */}
        <g class="tooth lower-tooth" id="lower-tooth-36">
          <path id="36"   d="M190 650 Q 210 630, 230 650 T 250 690 Q 230 710, 210 690 Q 190 670, 190 650 Z" fill={selectedTeeth.includes('36') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="200" y="630" fontSize="12"textAnchor="middle">36</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-46">
          <path  id="46"  d="M570 650 Q 590 630, 610 650 T 630 690 Q 610 710, 590 690 Q 570 670, 570 650 Z" fill={selectedTeeth.includes('46') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="605" y="630" fontSize="12"textAnchor="middle">46</text>
        </g>
      
        {/* <!-- Second Molars --> */}
        <g class="tooth lower-tooth" id="lower-tooth-37">
          <path  id="37"  d="M170 660 Q 190 640, 210 660 T 230 700 Q 210 720, 190 700 Q 170 680, 170 660 Z" fill={selectedTeeth.includes('37') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="180" y="640" fontSize="12"textAnchor="middle">37</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-47">
          <path  id="47"  d="M590 660 Q 610 640, 630 660 T 650 700 Q 630 720, 610 700 Q 590 680, 590 660 Z" fill={selectedTeeth.includes('47') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="625" y="640" fontSize="12"textAnchor="middle">47</text>
        </g>
      
        {/* <!-- Third Molars --> */}
        <g class="tooth lower-tooth" id="lower-tooth-38">
          <path  id="38"  d="M150 670 Q 170 650, 190 670 T 210 710 Q 190 730, 170 710 Q 150 690, 150 670 Z" fill={selectedTeeth.includes('38') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="160" y="650" fontSize="12"textAnchor="middle">38</text>
        </g>
        <g class="tooth lower-tooth" id="lower-tooth-48">
          <path  id="48"  d="M610 670 Q 630 650, 650 670 T 670 710 Q 650 730, 630 710 Q 610 690, 610 670 Z" fill={selectedTeeth.includes('48') ? 'blue' : '#ffffff'} stroke="#000" stroke-width="1"/>
          <text x="640" y="650" fontSize="12"textAnchor="middle">48</text>
        </g>
      
      
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" >
    <g id="Layer_1">
        <title>Layer 1</title>
        <path
            transform="rotate(90 234.001 237.03)"
            stroke="#000"
            id="svg_19"
            d="m121.18603,236.53174c8.35609,225.49758 233.97062,2.16825 225.6146,0.43366c8.35602,1.73459 -233.97069,-225.93124 -225.6146,-0.43366z"
            opacity="NaN"
            fill="#fff"
        />
        <line x1="133.99999" y1="197" x2="331.99999" y2="197" stroke="#000" strokeWidth="2" />
        <line x1="159" y1="260" x2="306" y2="260" stroke="#000" strokeWidth="2" />
        <text x="230" y="170" fontSize="18" textAnchor="middle" fill="#000" >{shades.shade1} </text>
        <text x="230" y="240" fontSize="18" textAnchor="middle" fill="#000" >{shades.shade2}</text>
        <text x="230" y="290" fontSize="18" textAnchor="middle" fill="#000" >{shades.shade2}</text>
    </g>
</svg>

   </svg>
      
    );
};

export default TeethDiagram;