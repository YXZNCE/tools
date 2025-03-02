document.addEventListener('DOMContentLoaded', function() {
    
    // omg wtf
    const pre = document.getElementById('prelims');
    const mid = document.getElementById('midterm');
    const prf = document.getElementById('prefinals');
    const fin = document.getElementById('finals');
    const tgt = document.getElementById('targetGWA');
    const pss = document.getElementById('passingGrade');
    const btn = document.getElementById('calculateBtn');
    
    [pre, mid, prf, fin, tgt, pss].forEach(inp => {
        if (inp) {
            inp.addEventListener('input', doMath); // lol math
        }
    });
    
    if (btn) {
        btn.addEventListener('click', doMath);
    }
    
    doMath(); // just do it
    
    const tab = document.querySelectorAll('.tab');
    const tbc = document.querySelectorAll('.tab-content');
    
    tab.forEach(crd => {
        crd.addEventListener('click', function() {
            const wat = this.getAttribute('data-tab'); // wtf is this

            tab.forEach(old => old.classList.remove('active'));

            tbc.forEach(con => con.classList.add('hidden'));
            
            this.classList.add('active');

            document.getElementById(`${wat}Content`).classList.remove('hidden'); // magic stuff
        });
    });
    
    const tog = document.getElementById('toggleGradingSystem');
    const grd = document.getElementById('gradingSystem');
    
    if (tog && grd) {
        tog.addEventListener('click', function() {
            grd.classList.toggle('hidden');
            
            const vis = !grd.classList.contains('hidden');
            tog.innerHTML = vis
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Hide Grading System'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> Show Grading System';
        });
    }
    
    const drk = document.getElementById('themeToggle');
    
    if (drk) {
        drk.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            
            fixDrk(); // fix it
            
            const blk = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', blk ? 'dark' : 'light'); // brain go brr
        });
    }
    
    function doMath() {
        const pr1 = pre && pre.value ? parseFloat(pre.value) : null;
        const pr2 = mid && mid.value ? parseFloat(mid.value) : null;
        const pr3 = prf && prf.value ? parseFloat(prf.value) : null;
        const pr4 = fin && fin.value ? parseFloat(fin.value) : null;
        const trg = tgt ? parseFloat(tgt.value || 74) : 74;
        const min = pss ? parseFloat(pss.value || 69.5) : 69.5;
        // nice
        
        showNum(pr1, pr2, pr3, pr4, trg, min);
        makFun(pr1, pr2, pr3, pr4, trg, min);
    }
    
    function calGWA(pr1, pr2, pr3, pr4) {
        let sum = 0;
        let wgt = 0;
        
        if (pr1 !== null) {
            sum += pr1 * 0.2;
            wgt += 0.2;
        }
        
        if (pr2 !== null) {
            sum += pr2 * 0.2;
            wgt += 0.2;
        }
        
        if (pr3 !== null) {
            sum += pr3 * 0.2;
            wgt += 0.2;
        }
        
        if (pr4 !== null) {
            sum += pr4 * 0.4;
            wgt += 0.4;
        }
        
        if (wgt === 0) {
            return null; // lmao idk
        }
        
        return sum / wgt;
    }
    
    function pctDun(pr1, pr2, pr3, pr4) {
        let sum = 0;
        
        if (pr1 !== null) sum += 0.2;
        if (pr2 !== null) sum += 0.2;
        if (pr3 !== null) sum += 0.2;
        if (pr4 !== null) sum += 0.4;
        
        return sum * 100; // pew pew
    }
    
    function nedGrd(pr1, pr2, pr3, pr4, trg, min) {
        let wgt = 0;
        let sum = 0;
        
        if (pr1 !== null) {
            wgt += 0.2;
            sum += pr1 * 0.2;
        }
        
        if (pr2 !== null) {
            wgt += 0.2;
            sum += pr2 * 0.2;
        }
        
        if (pr3 !== null) {
            wgt += 0.2;
            sum += pr3 * 0.2;
        }
        
        if (pr4 !== null) {
            wgt += 0.4;
            sum += pr4 * 0.4;
        }
        
        if (wgt >= 1) {
            return { val: null, cmp: 'Complete' }; // im done lol
        }
        
        let nxt = '';
        let wnt = 0;
        
        if (pr1 === null) {
            nxt = 'Prelims';
            wnt = 0.2;
        } else if (pr2 === null) {
            nxt = 'Midterms';
            wnt = 0.2;
        } else if (pr3 === null) {
            nxt = 'Pre-Finals';
            wnt = 0.2;
        } else {
            nxt = 'Finals';
            wnt = 0.4;
        }
        
        const req = (trg - sum) / wnt;
        
        return { val: req, cmp: nxt };
    }
            
    function canPas(pr1, pr2, pr3, pr4, min) {
        let wgt = 0;
        let sum = 0;
        
        if (pr1 !== null) {
            wgt += 0.2;
            sum += pr1 * 0.2;
        }
        
        if (pr2 !== null) {
            wgt += 0.2;
            sum += pr2 * 0.2;
        }
        
        if (pr3 !== null) {
            wgt += 0.2;
            sum += pr3 * 0.2;
        }
        
        if (pr4 !== null) {
            wgt += 0.4;
            sum += pr4 * 0.4;
        }
        
        if (wgt >= 1) {
            return { val: null, cmp: 'Complete' }; // ok na nga
        }
        
        let nxt = '';
        let wnt = 0;
        
        if (pr1 === null) {
            nxt = 'Prelims';
            wnt = 0.2;
        } else if (pr2 === null) {
            nxt = 'Midterms';
            wnt = 0.2;
        } else if (pr3 === null) {
            nxt = 'Pre-Finals';
            wnt = 0.2;
        } else {
            nxt = 'Finals';
            wnt = 0.4;
        }
        
        const req = (min - sum) / wnt;
        
        return { val: req, cmp: nxt };
    }
    
    function showNum(pr1, pr2, pr3, pr4, trg, min) {
        const gwa = document.getElementById('currentGWA');
        const eqv = document.getElementById('currentGWAEquivalent');
        const req = document.getElementById('requiredGrade');
        const inf = document.getElementById('requiredGradeInfo');
        const pas = document.getElementById('passingRequirement');
        const pin = document.getElementById('passingRequirementInfo');
        const bar = document.getElementById('progressBar');
        
        let avg = calGWA(pr1, pr2, pr3, pr4);
        let pct = pctDun(pr1, pr2, pr3, pr4);
        
        bar.style.width = `${pct}%`; // bar go brrrr
        
        if (avg !== null) {
            let lvl = '';
            if (avg >= 97.5) {
                lvl = '<span class="badge badge-success">Excellent</span>';
            } else if (avg >= 94.5) {
                lvl = '<span class="badge badge-success">Very Good</span>';
            } else if (avg >= 88.5) {
                lvl = '<span class="badge badge-success">Very Good</span>';
            } else if (avg >= 77.5) {
                lvl = '<span class="badge badge-success">Satisfactory</span>';
            } else if (avg >= 69.5) {
                lvl = '<span class="badge badge-warning">Fair</span>';
            } else {
                lvl = '<span class="badge badge-danger">Failed</span>';
            }
            
            gwa.innerHTML = `${avg.toFixed(2)} ${lvl}`;
            eqv.textContent = `GWA Equivalent: ${gwaNum(avg)}`;
        } else {
            gwa.textContent = 'N/A';
            eqv.textContent = 'Enter at least one grade';
        }
        
        const nxt = nedGrd(pr1, pr2, pr3, pr4, trg, min);
        if (nxt.val !== null) {
            let bdg = '';
            
            if (nxt.val > 100) {
                bdg = '<span class="badge badge-danger">Impossible</span>';
            } else if (nxt.val > 90) {
                bdg = '<span class="badge badge-warning">Challenging</span>';
            } else if (nxt.val <= 0) {
                bdg = '<span class="badge badge-success">Already Achieved</span>';
            }
            
            req.innerHTML = `${nxt.val > 100 ? 'N/A' : nxt.val.toFixed(2)}${bdg}`;
            inf.textContent = `Required ${nxt.cmp} to reach target GWA of ${trg}`;
        } else {
            req.textContent = 'Complete';
            inf.textContent = 'All grades entered';
        }
        
        const nps = canPas(pr1, pr2, pr3, pr4, min);
        
        if (nps.val !== null) {
            let bdg = '';
            
            if (nps.val > 100) {
                bdg = '<span class="badge badge-danger">Cannot Pass</span>';
            } else if (nps.val <= 0) {
                bdg = '<span class="badge badge-success">Already Passing</span>';
            }
            
            pas.innerHTML = `${nps.val > 100 ? 'N/A' : nps.val.toFixed(2)}${bdg}`;
            pin.textContent = `Minimum ${nps.cmp} to reach passing grade of ${min}`;
        } else {
            pas.textContent = 'Complete';
            pin.textContent = 'All grades entered';
        }
    }
    
    function makFun(pr1, pr2, pr3, pr4, trg, min) {
        const box = document.getElementById('predictionContainer');
        box.innerHTML = '';
        
        // yeet pota??!
        const wat = getScn(pr1, pr2, pr3, pr4, trg, min);
        
        wat.forEach(scn => {
            const crd = document.createElement('div');
            crd.className = 'prediction-card';
            
            let hdr = document.createElement('div');
            hdr.className = 'prediction-title';
            hdr.innerHTML = `<span>${scn.ttl}</span>`;
            
            if (scn.sts) {
                const cls = scn.sts === 'impossible' ? 'badge-danger' : 
                                scn.sts === 'challenging' ? 'badge-warning' : 
                                'badge-success';
                const txt = scn.sts.charAt(0).toUpperCase() + scn.sts.slice(1);
                hdr.innerHTML += `<span class="badge ${cls}">${txt}</span>`;
            }
            
            crd.appendChild(hdr);
            
            scn.grd.forEach(row => {
                const itm = document.createElement('div');
                itm.className = 'prediction-row';
                itm.innerHTML = `
                    <span class="prediction-label">${row.lbl}</span>
                    <span class="prediction-value">${row.val}</span>
                `;
                crd.appendChild(itm);
            });
            
            box.appendChild(crd);
        });
    }
    
    function getScn(pr1, pr2, pr3, pr4, trg, min) {
        const res = [];
        
        let wgt = 0;
        if (pr1 !== null) wgt += 0.2;
        if (pr2 !== null) wgt += 0.2;
        if (pr3 !== null) wgt += 0.2;
        if (pr4 !== null) wgt += 0.4;
        
        // fota
        if (pr1 !== null) {
            let sum = pr1 * 0.2;
            let localWgt = 0.2;
            let ttl = 'Current Progress to Passing';
            let grd = [{ lbl: 'Prelims', val: pr1.toFixed(2) }];
            
            if (pr2 !== null) {
                sum += pr2 * 0.2;
                localWgt += 0.2;
                grd.push({ lbl: 'Midterms', val: pr2.toFixed(2) });
            }
            
            if (pr3 !== null) {
                sum += pr3 * 0.2;
                localWgt += 0.2;
                grd.push({ lbl: 'Pre-Finals', val: pr3.toFixed(2) });
            }
            
            if (pr4 !== null) {
                sum += pr4 * 0.4;
                localWgt += 0.4;
                grd.push({ lbl: 'Finals', val: pr4.toFixed(2) });
            }
            
            // wtf math
            if (localWgt < 1) {
                const lft = 1 - localWgt;
                const ned = (min - sum) / lft;
                
                let ok = 'achievable';
                if (ned > 100) ok = 'impossible';
                else if (ned > 90) ok = 'challenging';
                else if (ned <= 0) ok = 'guaranteed';
                
                grd.push({ 
                    lbl: 'Minimum Needed in Remaining Components', 
                    val: ned <= 0 ? 'Already Passing' : 
                          ned > 100 ? 'Cannot Pass' : 
                          ned.toFixed(2) 
                });
                
                res.push({ ttl, grd, sts: ok });
            } else {
                const fin = sum;
                grd.push({ 
                    lbl: 'Final GWA', 
                    val: fin.toFixed(2) + ` (${gwaNum(fin)})` 
                });
                
                let ok = fin >= min ? 'achievable' : 'impossible';
                
                res.push({ ttl, grd, sts: ok });
            }
        }
        
        // Target GWA prediction - NEW SHIT YO
        if (pr1 !== null && wgt < 1) {
            let sum = pr1 * 0.2;
            let localWgt = 0.2;
            let ttl = `Target GWA: ${trg.toFixed(2)} (${gwaNum(trg)})`;
            let grd = [{ lbl: 'Prelims', val: pr1.toFixed(2) }];
            
            if (pr2 !== null) {
                sum += pr2 * 0.2;
                localWgt += 0.2;
                grd.push({ lbl: 'Midterms', val: pr2.toFixed(2) });
            }
            
            if (pr3 !== null) {
                sum += pr3 * 0.2;
                localWgt += 0.2;
                grd.push({ lbl: 'Pre-Finals', val: pr3.toFixed(2) });
            }
            
            if (pr4 !== null) {
                sum += pr4 * 0.4;
                localWgt += 0.4;
                grd.push({ lbl: 'Finals', val: pr4.toFixed(2) });
            }
            
            // Calculate for target GWA
            const lft = 1 - localWgt;
            const ndT = (trg - sum) / lft;
            
            let sht = 'achievable';
            if (ndT > 100) sht = 'impossible';
            else if (ndT > 90) sht = 'challenging';
            else if (ndT <= 0) sht = 'already achieved';
            
            grd.push({ 
                lbl: 'Needed in Remaining Components', 
                val: ndT <= 0 ? 'Already Achieved' : 
                    ndT > 100 ? 'Impossible to Achieve' : 
                    ndT.toFixed(2) 
            });
            
            res.push({ ttl, grd, sts: sht });
        }
        
        // dang scenario
        if (pr1 !== null && pr2 === null) {
            const scn = {
                ttl: 'If You Get These Grades',
                grd: [
                    { lbl: 'Prelims', val: pr1.toFixed(2) }
                ],
                sts: null
            };
            
            // baryabols
            const pwt = pr1 * 0.2;
            const lft = 0.8;
            const min_rest = (min - pwt) / lft;
            
            //  midterms
            const exp = Math.min(100, Math.max(0, pwt >= min ? 0 : min_rest));
            
            // moar math lol
            const mwt = exp * 0.2;
            const pfn = (min - pwt - mwt) / 0.6;
            
            scn.grd.push({ 
                lbl: 'Projected Midterms', 
                val: exp === 0 ? 'Any grade (already passing)' : 
                      exp > 100 ? 'Cannot pass with any grade' : 
                      exp.toFixed(2) 
            });
            
            scn.grd.push({ 
                lbl: 'Then Needed in Pre-Finals and Finals', 
                val: pfn <= 0 ? 'Any grade (already passing)' : 
                      pfn > 100 ? 'Cannot pass with any grade' : 
                      pfn.toFixed(2) 
            });
            
            if (exp > 100 || pfn > 100) {
                scn.sts = 'impossible';
            } else if (exp > 90 || pfn > 90) {
                scn.sts = 'challenging';
            } else {
                scn.sts = 'achievable';
            }
            
            res.push(scn);
            
            // NEW TARGET GWA PREDICTION - ONE GRADE ENTERED
            const trgScn = {
                ttl: `To Reach Target GWA: ${trg.toFixed(2)}`,
                grd: [
                    { lbl: 'Prelims', val: pr1.toFixed(2) }
                ],
                sts: null
            };
            
            // Calculate target GWA needs
            const trgNeeded = (trg - (pr1 * 0.2)) / 0.8;
            
            if (trgNeeded <= 100 && trgNeeded > 0) {
                // Calculate based on different paths
                const midPath = Math.min(100, Math.max(0, trgNeeded));
                
                // If you get that grade in midterms, what do you need in the rest?
                const midWgt = midPath * 0.2;
                const prefinalsFinals = (trg - (pr1 * 0.2) - midWgt) / 0.6;
                
                trgScn.grd.push({ 
                    lbl: 'Needed in Midterms', 
                    val: midPath.toFixed(2) 
                });
                
                trgScn.grd.push({ 
                    lbl: 'Then Needed in Pre-Finals and Finals', 
                    val: prefinalsFinals <= 0 ? 'Any grade' : 
                          prefinalsFinals > 100 ? 'Not possible with this midterm grade' : 
                          prefinalsFinals.toFixed(2) 
                });
                
                let trgSts = 'achievable';
                if (midPath > 90 || prefinalsFinals > 90) trgSts = 'challenging';
                if (prefinalsFinals > 100) trgSts = 'impossible';
                
                trgScn.sts = trgSts;
            } else if (trgNeeded <= 0) {
                trgScn.grd.push({ 
                    lbl: 'Status', 
                    val: 'Target GWA already achieved with current grades'
                });
                trgScn.sts = 'achieved';
            } else {
                trgScn.grd.push({ 
                    lbl: 'Status', 
                    val: 'Target GWA impossible to achieve even with 100 in all remaining components'
                });
                trgScn.sts = 'impossible';
            }
            
            res.push(trgScn);
        }
        
        // bruh prefinals - now with target GWA
        if (pr1 !== null && pr2 !== null && pr3 === null) {
            const scn = {
                ttl: 'If You Get These Grades',
                grd: [
                    { lbl: 'Prelims', val: pr1.toFixed(2) },
                    { lbl: 'Midterms', val: pr2.toFixed(2) }
                ],
                sts: null
            };
            
            // more calculations plz
            const wsm = (pr1 * 0.2) + (pr2 * 0.2);
            const lft = 0.6;
            const mlf = (min - wsm) / lft;
            
            // random prefinals
            const exp = Math.min(100, Math.max(0, wsm >= min ? 0 : mlf));
            
            // calculate finals bruh
            const pwt = exp * 0.2;
            const fnd = (min - wsm - pwt) / 0.4;
            
            scn.grd.push({ 
                lbl: 'Projected Pre-Finals', 
                val: exp === 0 ? 'Any grade (already passing)' : 
                      exp > 100 ? 'Cannot pass with any grade' : 
                      exp.toFixed(2) 
            });
            
            scn.grd.push({ 
                lbl: 'Then Needed in Finals', 
                val: fnd <= 0 ? 'Any grade (already passing)' : 
                      fnd > 100 ? 'Cannot pass with any grade' : 
                      fnd.toFixed(2) 
            });
            
            if (exp > 100 || fnd > 100) {
                scn.sts = 'impossible';
            } else if (exp > 90 || fnd > 90) {
                scn.sts = 'challenging';
            } else {
                scn.sts = 'achievable';
            }
            
            res.push(scn);
            
            // NEW TARGET GWA PREDICTION - 2 GRADES ENTERED
            const trgScn = {
                ttl: `To Reach Target GWA: ${trg.toFixed(2)}`,
                grd: [
                    { lbl: 'Prelims', val: pr1.toFixed(2) },
                    { lbl: 'Midterms', val: pr2.toFixed(2) }
                ],
                sts: null
            };
            
            // Calculate what's needed for target in remaining components
            const currSum = (pr1 * 0.2) + (pr2 * 0.2);
            const trgNeeded = (trg - currSum) / 0.6;
            
            if (trgNeeded <= 100 && trgNeeded > 0) {
                // Calculate prefinals estimate
                const preEst = Math.min(100, Math.max(0, trgNeeded));
                
                // If you get this in prefinals, what do you need in finals?
                const preWgt = preEst * 0.2;
                const finalNeed = (trg - currSum - preWgt) / 0.4;
                
                trgScn.grd.push({ 
                    lbl: 'Needed in Pre-Finals', 
                    val: preEst.toFixed(2) 
                });
                
                trgScn.grd.push({ 
                    lbl: 'Then Needed in Finals', 
                    val: finalNeed <= 0 ? 'Any grade' : 
                          finalNeed > 100 ? 'Not possible with this pre-finals grade' : 
                          finalNeed.toFixed(2) 
                });
                
                let trgSts = 'achievable';
                if (preEst > 90 || finalNeed > 90) trgSts = 'challenging';
                if (finalNeed > 100) trgSts = 'impossible';
                
                trgScn.sts = trgSts;
            } else if (trgNeeded <= 0) {
                trgScn.grd.push({ 
                    lbl: 'Status', 
                    val: 'Target GWA already achieved with current grades'
                });
                trgScn.sts = 'achieved';
            } else {
                trgScn.grd.push({ 
                    lbl: 'Status', 
                    val: 'Target GWA impossible to achieve even with 100 in all remaining components'
                });
                trgScn.sts = 'impossible';
            }
            
            res.push(trgScn);
        }
        
        // last one smh - now with target calc
        if (pr1 !== null && pr2 !== null && pr3 !== null && pr4 === null) {
            const wsm = (pr1 * 0.2) + (pr2 * 0.2) + (pr3 * 0.2);
            const fnd = (min - wsm) / 0.4;
            
            const scn = {
                ttl: 'Finals Requirement',
                grd: [
                    { lbl: 'Prelims', val: pr1.toFixed(2) },
                    { lbl: 'Midterms', val: pr2.toFixed(2) },
                    { lbl: 'Pre-Finals', val: pr3.toFixed(2) },
                    { 
                        lbl: 'Required Finals', 
                        val: fnd <= 0 ? 'Any grade (already passing)' : 
                              fnd > 100 ? 'Cannot pass with any grade' : 
                              fnd.toFixed(2) 
                    }
                ],
                sts: null
            };
            
            if (fnd > 100) {
                scn.sts = 'impossible';
            } else if (fnd > 90) {
                scn.sts = 'challenging';
            } else if (fnd <= 0) {
                scn.sts = 'guaranteed';
            } else {
                scn.sts = 'achievable';
            }
            
            res.push(scn);
            
            // NEW TARGET GWA FOR JUST FINALS
            const trgScn = {
                ttl: `Target GWA: ${trg.toFixed(2)} Requirement`,
                grd: [
                    { lbl: 'Prelims', val: pr1.toFixed(2) },
                    { lbl: 'Midterms', val: pr2.toFixed(2) },
                    { lbl: 'Pre-Finals', val: pr3.toFixed(2) }
                ],
                sts: null
            };
            
            const sumSoFar = (pr1 * 0.2) + (pr2 * 0.2) + (pr3 * 0.2);
            const trgFinal = (trg - sumSoFar) / 0.4;
            
            if (trgFinal <= 100 && trgFinal > 0) {
                trgScn.grd.push({ 
                    lbl: 'Required Finals for Target GWA', 
                    val: trgFinal.toFixed(2)
                });
                
                let trgSts = 'achievable';
                if (trgFinal > 90) trgSts = 'challenging';
                
                trgScn.sts = trgSts;
            } else if (trgFinal <= 0) {
                trgScn.grd.push({ 
                    lbl: 'Required Finals for Target GWA', 
                    val: 'Any grade (target already achievable)'
                });
                trgScn.sts = 'guaranteed';
            } else {
                trgScn.grd.push({ 
                    lbl: 'Required Finals for Target GWA', 
                    val: 'Impossible to achieve target GWA'
                });
                trgScn.sts = 'impossible';
            }
            
            res.push(trgScn);
        }
        
        return res;
    }
    
    function gwaNum(g) {
        if (g < 69.5) return "5.00 (Failed)";
        if (g < 73.5) return "3.00 (Fair)";
        if (g < 77.5) return "2.75 (Fair)";
        if (g < 81.5) return "2.50 (Satisfactory)";
        if (g < 85.5) return "2.25 (Satisfactory)";
        if (g < 88.5) return "2.00 (Satisfactory)";
        if (g < 91.5) return "1.75 (Very Good)";
        if (g < 94.5) return "1.50 (Very Good)";
        if (g < 97.5) return "1.25 (Very Good)";
        return "1.00 (Excellent)";
    }
    
    document.addEventListener('keydown', function(e) {
        // Ctrl+K or Cmd+K to open command menu
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            cmdBox();
        }
        
        // Escape to close command menu
        if (e.key === 'Escape' && !document.getElementById('commandMenu').classList.contains('hidden')) {
            cmdBox();
        }
    });
    
    function cmdBox() {
        const mnu = document.getElementById('commandMenu');
        const inp = document.getElementById('commandInput');
        
        // Clear previous input value when reopening
        if (mnu.classList.contains('hidden')) {
            inp.value = '';
        }
        
        mnu.classList.toggle('hidden');
        
        if (!mnu.classList.contains('hidden')) {
            inp.focus();
            filCmd();
            
            // Add event listener for filtering commands
            inp.addEventListener('input', handleCommandFilter);
        } else {
            // Remove event listener when menu is closed
            inp.removeEventListener('input', handleCommandFilter);
        }
    }
    
    // Command filter handler
    function handleCommandFilter() {
        filCmd(this.value.toLowerCase());
    }
    
    //COMMAAAAAAAAAAAAAAAAAAND
    //dont remve
    function filCmd(flt) {
        const lst = document.getElementById('commandList');
        lst.innerHTML = '';
        
        const cmd = [
            { ico: '🌙', txt: 'Toggle Dark Mode', act: function() { document.getElementById('themeToggle').click(); } },
            { ico: '🧮', txt: 'Calculate Grades', act: function() { document.getElementById('calculateBtn').click(); } },
            { ico: '📊', txt: 'View Predictions', act: function() { swtTab('predictions'); } },
            { ico: '❓', txt: 'View Tips & Help', act: function() { swtTab('tips'); } },
            { ico: '📝', txt: 'Reset All Inputs', act: clrAll },
        ];
        
        cmd.forEach(c => {
            // If filter is provided, only show matching commands
            if (flt && !c.txt.toLowerCase().includes(flt)) return;
            
            const itm = document.createElement('div');
            itm.className = 'command-item';
            itm.innerHTML = `<span class="command-icon">${c.ico}</span> ${c.txt}`;
            itm.addEventListener('click', function() {
                c.act();
                cmdBox();
            });
            lst.appendChild(itm);
        });
    }
    
    function swtTab(id) {
        const tab = document.querySelector(`.tab[data-tab="${id}"]`);
        if (tab) tab.click();
    }
    
    function clrAll() {
        document.querySelectorAll('#gradeForm input').forEach(inp => {
            inp.value = '';
        });
        document.getElementById('targetGWA').value = '74';
        document.getElementById('passingGrade').value = '69.5';
        doMath();
        msg('Inputs Reset', 'All form inputs have been cleared.', 'info');
    }
    
    // toast -> toast
    function msg(ttl, txt, typ = 'info') {
        const box = document.getElementById('toastContainer');
        
        const tst = document.createElement('div');
        tst.className = `toast toast-${typ}`;
        
        const ico = typ === 'success' 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        
        tst.innerHTML = `
            <div class="toast-icon">${ico}</div>
            <div class="toast-content">
                <div class="toast-title">${ttl}</div>
                <div class="toast-message">${txt}</div>
            </div>
            <button class="toast-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        box.appendChild(tst);
        
        tst.querySelector('.toast-close').addEventListener('click', function() {
            tst.remove();
        });
        
        // remove after 5sec
        setTimeout(() => {
            tst.style.opacity = '0';
            tst.style.transform = 'translateX(100%)';
            setTimeout(() => tst.remove(), 300);
        }, 5000);
    }
    
    // show first visit toast
    if (!localStorage.getItem('visitedBefore')) {
        setTimeout(() => {
            msg(
                'Welcome to Grade Calculator!', 
                'Enter your grades to see predictions and requirements.',
                'info'
            );
            localStorage.setItem('visitedBefore', 'true');
        }, 1000);
    }
    
    // tutorial
    if (!localStorage.getItem('onboardingComplete')) {
        tutLol();
    }
    
    function tutLol() {
        const inf = [
            {
                ttl: 'Welcome to Grade Calculator',
                txt: 'This tool helps you track your academic progress and predict the grades you need to pass or achieve your target GWA.'
            },
            {
                ttl: 'Enter Your Grades',
                txt: 'Start by entering the grades you already know. You can leave fields blank for grades you don\'t have yet.'
            },
            {
                ttl: 'View Your Predictions',
                txt: 'Switch to the Predictions tab to see different scenarios for your remaining grades.'
            },
            {
                ttl: 'Need Help?',
                txt: 'Check the Tips & Help tab for guidance, or press Ctrl+K to access the command menu at any time.'
            }
        ];
        
        let stp = 0;
        
        function mkStp(s, i, tot) {
            const bg = document.createElement('div');
            bg.className = 'onboarding-overlay';
            
            const box = document.createElement('div');
            box.className = 'onboarding-card';
            
            box.innerHTML = `
                <div class="onboarding-header">
                    <div class="onboarding-step">${i + 1}</div>
                    <div class="onboarding-title">${s.ttl}</div>
                </div>
                <div class="onboarding-content">
                    ${s.txt}
                </div>
                <div class="onboarding-footer">
                    ${i > 0 ? '<button class="btn btn-outline" id="prevStep">Previous</button>' : '<div></div>'}
                    <button class="btn btn-primary" id="nextStep">${i < tot - 1 ? 'Next' : 'Get Started'}</button>
                </div>
            `;
            
            bg.appendChild(box);
            document.body.appendChild(bg);
            
            document.getElementById('nextStep').addEventListener('click', function() {
                bg.remove();
                if (i < tot - 1) {
                    shwStp(i + 1);
                } else {
                    localStorage.setItem('onboardingComplete', 'true');
                }
            });
            
            if (i > 0) {
                document.getElementById('prevStep').addEventListener('click', function() {
                    bg.remove();
                    shwStp(i - 1);
                });
            }
        }
        
        function shwStp(i) {
            mkStp(inf[i], i, inf.length);
        }
        
        // tutorial
        shwStp(0);
    }
    
    // update icon for dark
    function fixDrk() {
        const btn = document.getElementById('themeToggle');
        const blk = document.documentElement.classList.contains('dark');
        
        btn.innerHTML = blk
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
    
    // get theme
    function setTme() {
        const blk = localStorage.getItem('theme');
        
        if (blk) {
            document.documentElement.classList.toggle('dark', blk === 'dark');
        } else {
            // check sys pref
            const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', sys);
        }
        
        fixDrk(); // fix it
    }
    
    // get theme
    setTme();
    
    // tooltips lol
    const inp = document.querySelectorAll('.grade-input');
    inp.forEach(el => {
        const tip = document.createElement('div');
        tip.className = 'tooltip';
        tip.textContent = 'Enter a grade between 0 and 100';
        
        el.parentNode.appendChild(tip);
        
        el.addEventListener('focus', function() {
            const pos = this.getBoundingClientRect();
            tip.style.top = `${pos.bottom + 8}px`;
            tip.style.left = `${pos.left}px`;
            tip.classList.add('visible');
        });
        
        el.addEventListener('blur', function() {
            tip.classList.remove('visible');
        });
    });
}); 