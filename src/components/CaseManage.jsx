import React, { useEffect, useState } from 'react';
import './CaseManage.css';
import { ReactComponent as TeethDiagram } from '../icons/teeth_demo.svg';

const CaseManage = () => {
    const [selectedTeeth, setSelectedTeeth] = useState([]);

    // Handle tooth selection
    const handleToothClick = (toothId) => {
        setSelectedTeeth((prevSelected) => {
            const isSelected = prevSelected.includes(toothId);
            
            // Update the selected teeth state
            const updatedSelectedTeeth = isSelected 
                ? prevSelected.filter((id) => id !== toothId) // Unselect
                : [...prevSelected, toothId]; // Select

            // Update the fill color of the clicked tooth
            const toothElement = document.getElementById(toothId);
            if (toothElement) {
                toothElement.style.fill = isSelected ? '#ffffff' : 'blue'; // Change color based on selection
            }
            
            return updatedSelectedTeeth;
        });
    };

    // Select all teeth
    const selectFullTeeth = () => {
        const svg = document.querySelector('.teeth-diagram');
        const allToothIds = Array.from(svg.querySelectorAll('path')).map(tooth => tooth.getAttribute('id'));
        setSelectedTeeth(allToothIds);
        
        // Change the fill color of all teeth to blue
        allToothIds.forEach(id => {
            const toothElement = document.getElementById(id);
            if (toothElement) {
                toothElement.style.fill = 'blue'; // Set color to blue
            }
        });
    };

    // Deselect all teeth
    const unselectAllTeeth = () => {
        setSelectedTeeth([]);
        
        const svg = document.querySelector('.teeth-diagram');
        const toothElements = svg.querySelectorAll('path');
        
        // Reset the fill color of all teeth to white
        toothElements.forEach(tooth => {
            tooth.style.fill = '#ffffff'; // Reset color to white
        });
    };

    useEffect(() => {
        const svg = document.querySelector('.teeth-diagram');
        const toothPaths = svg.querySelectorAll('path');

        // Attach event listeners for click
        const handleClick = (event) => {
            const toothId = event.target.getAttribute('id');
            handleToothClick(toothId);
        };

        toothPaths.forEach((tooth) => {
            tooth.addEventListener('click', handleClick);
        });

        // Cleanup listeners on unmount
        return () => {
            toothPaths.forEach((tooth) => {
                tooth.removeEventListener('click', handleClick);
            });
        };
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            {/* Patient Info Inputs */}
                        </div>
                    </div>
                    
                    <div className="col col-12">
                        <div className="teeth-container">
                            <TeethDiagram className="teeth-diagram" />
                        </div>

                        <div>
                            <h3>Selected Teeth:</h3>
                            {selectedTeeth.length > 0 ? (
                                <p>{selectedTeeth.join(', ')}</p>
                            ) : (
                                <p>No teeth selected</p>
                            )}
                        </div>

                        <div className="button-group">
                            <button className="btn btn-primary" onClick={selectFullTeeth}>Select Full Teeth</button>
                            <button className="btn btn-secondary" onClick={unselectAllTeeth}>Unselect All Teeth</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseManage;