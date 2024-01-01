export const getValueAtBit = (value: number, position: number) => {
    if (position<1) {
        return "0";
    }

    // check if position is greater than sqrt of value 
    if(Math.floor(Math.sqrt(value)) < position) {
        return "0";
    }

    // convert value byte to binary
    const binary = value.toString(2);

    // shift x positions
    return binary.charAt(binary.length - position);
}