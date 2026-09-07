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

echo "Updating system.json"
mv system.json system.json.old
jq --arg version "v${version}" '.version = $version' system.json.old > system.json

git add system.json
git commit -m "Updated version number"

echo "Creating ${filename}"
${zip_tool} -n ${filename}

for dir in ${release_dirs}; do
	add_dir ${dir}
done

${zip_tool} ${filename} add_file system.json system.json 0 0
${zip_tool} ${filename} add_file mcrows.json mcrows.json 0 0

git tag "v${version}"
git push origin "v${version}"
gh release create "v${version}" \
  --title "v${version}"  \
  --generate-notes \
  ${filename} \
  system.json

echo "Updating current release"
git tag -f current

rm -f ${archive_dir}/mcrows.zip
cp ${filename} ${archive_dir}/mcrows.zip

gh release delete current -y

gh release create "current" \
  --latest \
  --title "current"  \
  --generate-notes \
  ${archive_dir}/mcrows.zip \
  system.json

