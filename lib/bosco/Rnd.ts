module bosco.utils {
  "use strict"
	export class Rnd {
    
    /**
     * @returns true/false random value
     */
		public static nextBool() {
        return ((~~(Math.random() * 32767)) & 1) === 1
    }

    /*
     * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
     * 
     * @returns random double
     */
    public static nextDouble() {
        return Math.random()
    }

    /*
     * Generates a random int value from 0, inclusive, to max, exclusive.
     * 
     * @returns random int
     */
    public static nextInt(max) {
        return ~~(Math.random() * max)
    }
    
    
    /**
     * Generates a random number in a range
     * 
     * @param start starting number of range
     * @param end optional ending number in range
     */
    public static random(start, end?) {
      if (end === undefined) {
        return Rnd.nextInt(start+1)
      } else if (parseInt(start) === parseFloat(start) && parseInt(end) === parseFloat(end)) {
        return start + Rnd.nextInt(end - start + 1)
      } else {
        return start + Rnd.nextDouble() * (end - start)
      }
    }
		
	}
}