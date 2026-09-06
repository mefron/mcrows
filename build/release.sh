#!/usr/bin/bash

version=${1}

archive_dir=archive
base_filename=mcrows

zip_tool="ziptool"

release_dirs="assets lang module packs styles"

if [[ ${version:-} =~ ^[0-9]+[.][0-9]+[.][0-9]+$ ]]; then
	echo "Creating release ${version}"
else
	echo "Invalid version number '${version}'"
	exit -1
fi

filename="${archive_dir}/${base_filename}-v${version}.zip"

if [ -f ${filename} ]; then
	echo "Release ${filename} already exists"
	exit -1
fi

add_dir() {
	dir=$1
	echo "Adding directory ${dir}"
	${zip_tool} ${filename} add_dir ${dir}
	for file in ${dir}/*; do
		if [ -f ${file} ]; then
			add_file ${file}
		elif [ -d ${file} ]; then
			add_dir ${file}
		fi
	done
}

add_file() {
	filepath=$1
	echo "Adding file ${filepath}"
	${zip_tool} ${filename} add_file ${filepath} ${filepath} 0 0
}

echo "Creating ${filename}"
${zip_tool} -n ${filename}

for dir in ${release_dirs}; do
	add_dir ${dir}
done

#${zip_tool} ${filename} add_dir images add_dir lang add_dir module add_dir packs add_dir styles add_file system.json system.json 0 0 add_file mcrows.json mcrows.json 0 0