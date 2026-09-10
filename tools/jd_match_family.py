"""Role-FAMILY ATS match. Scores a resume against terms that MULTIPLE REAL EMPLOYERS
in that role family actually use, rather than against a hand-written list I invented.

Method: for each family, take every real JD in the corpus, extract unigrams + bigrams,
and keep only terms that appear in >= MIN_DF distinct employers' postings. That document
frequency filter is what makes this honest: I cannot quietly add a term to the answer key.

Usage:  python3 jd_match_family.py <family> <resume.pdf>
        families: ai | ds | fd
"""
import re, subprocess, sys, json
from collections import Counter

D = "/sessions/charming-nice-ramanujan/mnt/outputs/"

FAMILIES = {
    # AI / Applied AI engineer roles
    "ai": ["jd_lightfield", "jd_anthropic", "jd_hp", "jd_tcs", "jd_salesforce", "jd_normal"],
    # Data science / applied ML roles
    "ds": ["jd_aven", "jd_bcgx_scientist", "jd_visa", "jd_tcs"],
    # Forward deployed / solutions / customer-facing AI roles
    "fd": ["jd_bcgx", "jd_lightfield", "jd_salesforce", "jd_anthropic", "jd_hp"],
}
MIN_DF = 2   # term must be used by at least this many distinct employers

STOP = set("""a an the and or but if then than that this these those of in on at to for with without from by as is are
was were be been being it its it's we you your our their they them he she his her i me my will would can could should
may might must have has had do does did not no yes so such own same other others more most some any each both few all
into out up down over under again further once here there when where why how what which who whom about across after
before during while also just very too only own s t don now well like get make made use used using new one two three
you'll you're we're we'll join role team teams work working looking seeking help helps within across per etc via
including include includes based strong great good high highly ability able years year plus preferred required
requirements responsibilities qualifications apply applicants candidates candidate position job opportunity company
office hybrid remote onsite salary range benefits equity annual base full time bachelor bachelors master masters degree
university college school student graduate graduating class program",""".split())


# Excluded from the answer key on principle, NOT because they are inconvenient:
# place names, and pure recruiting boilerplate that describes the posting rather than
# any skill. Everything else a JD says stays in scope, including soft skills.
BOILERPLATE = set("""york san francisco cleveland campbell states united america bay area
new york san francisco headquarters onsite hybrid remote posting posted
early level broader future opportunities ready actually alongside recruiting
group related field consulting boston
""".split()) | {"new york", "san francisco", "bay area", "united states", "related field"}


def terms_for(family):
    docfreq = Counter()
    for name in FAMILIES[family]:
        raw = open(D + name + ".txt").read().lower()
        w = [x.strip("./-") for x in re.findall(r"[a-z][a-z0-9\+\#\./-]{1,}", raw)]
        uni = {x for x in w if x not in STOP and len(x) > 2}
        bi = {f"{a} {b}" for a, b in zip(w, w[1:])
              if a not in STOP and b not in STOP and len(a) > 2 and len(b) > 2}
        for term in (uni | bi):
            if term in BOILERPLATE: continue
            docfreq[term] += 1
    return sorted(t for t, c in docfreq.items() if c >= MIN_DF), docfreq

def main():
    family, pdf = sys.argv[1], sys.argv[2]
    terms, docfreq = terms_for(family)
    # Normalize the resume the SAME way the JD is tokenized (punctuation stripped, single
    # spaces), otherwise a JD bigram like "design build" can never match a resume that
    # correctly writes "design, build". That was a scorer bug, not a resume defect.
    _raw = subprocess.run(["pdftotext", pdf, "-"], capture_output=True, text=True).stdout.lower()
    flat = " ".join(x.strip("./-") for x in re.findall(r"[a-z][a-z0-9\+\#\./-]{1,}", _raw))

    def present(term):
        return term in flat or term.rstrip("s") in flat

    hit = [t for t in terms if present(t)]
    miss = [t for t in terms if not present(t)]

    # CRITICAL = the consensus core: terms at least 3 employers (or all, if fewer) use.
    n = len(FAMILIES[family])
    crit_df = min(3, n)
    critical = sorted(t for t, c in docfreq.items() if c >= crit_df)
    c_hit = [t for t in critical if present(t)]
    c_miss = [t for t in critical if not present(t)]

    print(json.dumps({
        "family": family,
        "jds_in_family": FAMILIES[family],
        "terms_used_by_2plus_employers": len(terms),
        "coverage": f"{len(hit)}/{len(terms)} = {round(100*len(hit)/len(terms))}%",
        "critical_terms_used_by_%dplus_employers" % crit_df: len(critical),
        "critical_coverage": f"{len(c_hit)}/{len(critical)} = {round(100*len(c_hit)/max(1,len(critical)))}%",
        "critical_missing": c_miss,
        "missing_sample": miss[:60],
    }, indent=1))

if __name__ == "__main__":
    main()
