#!/bin/bash
make_image()
{
	if [ $1 -lt 10 ]; then
                page="0$1"
        else
                page="$1"
        fi
        xvfb-run --server-args="-screen 0, 1920x1080x24" ./CutyCapt --min-width=1920 --min-height=1080 --url="http://localhost/b32info/slideshow.php?nomenu=1&page=${1}" --out="../img/screenshots/b32info_page_${page}.png"
        if [ $? -gt 0 ]; then
                echo "ERROR: Failed to screenshot b32info page ${1}."
        else
                echo "Successfully took screenshot of b32info page ${1}."
        fi
}

cd `dirname $0`
if [ $# > 0 ]; then
	for p in "$@"; do
		make_image $p
	done
else
	pages=`grep '"text":"' ../data.json | wc -l`
	for (( p=0; p<$pages; p++ )); do
		make_image $p
	done
fi
rm 0
