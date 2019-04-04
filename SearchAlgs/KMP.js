function KMP(haystack, needle) {
    
    let n = haystack.length;
    let m = needle.length;

    let lps = Array.from({length: m}, () => null);
    let j = 0;

    getLSP(needle, m, lps);

    let i = 0; // index for haystack[] 
    while (i < n) { 
        if (needle.charAt(j) == haystack.charAt(i)) { 
            j++; 
            i++; 
        } 
        if (j == m) { 
            console.log("Found pattern " + "at index " + (i - j)); 
            j = lps[j - 1]; 
        } 

        // mismatch after j matches 
        else if (i < n && needle.charAt(j) != haystack.charAt(i)) { 
            // Do not match lps[0..lps[j-1]] characters, 
            // they will match anyway 
            if (j != 0) 
                j = lps[j - 1]; 
            else
                i = i + 1; 
        } 
    } 

    
}

function getLSP(pattern, m, lps) {
    let j = 0;
    let i = 1;
    lps[0] = 0;


    while (i < m) {
        if(pattern.charAt(i) === pattern.charAt(j)) {
            lps[i] = j + 1;
            j++;
            i++;
        } else  { // (pat[i] != pat[len])
            // This is tricky. Consider the example. 
            // AAACAAAA and i = 7. The idea is similar 
            // to search step. 
            if (j != 0) { 
                j = lps[j - 1]; 

                // Also, note that we do not increment 
                // i here 
            } 
            else // if (j == 0) 
            { 
                lps[i] = j; 
                i++; 
            } 
        } 
    }

}


