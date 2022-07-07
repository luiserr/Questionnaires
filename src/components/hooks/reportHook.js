import * as React from 'react';
import {useEffect, useState} from 'react';

export const useReport = (data) => {

    const roles = data.find(e => e.typeAssigment === 'roles');
    const regionals = data.find(e => e.typeAssigment === 'regionals');
    const programs = data.find(e => e.typeAssigment === 'programs');
    const groups = data.find(e => e.typeAssigment === 'groups');
    
    const myConfigurationRoles = getConfiguration(roles);
    const myConfigurationRegionals = getConfiguration(regionals);
    const myConfigurationPrograms = getConfiguration(programs);
    const myConfigurationGroups = getConfiguration(groups);

    const allRoles = getRoles(
        myConfigurationRoles,
        myConfigurationRegionals,
        myConfigurationPrograms,
        myConfigurationGroups
    );

    const allModalities = getModalities(
        myConfigurationRegionals,
        myConfigurationPrograms
    );

    const allCourseTypes = getCourseTypes(
        myConfigurationRegionals,
        myConfigurationPrograms
    );

    const allRegionals = getRegionals(
        myConfigurationRegionals
    );

    const allCenters = getCenters(
        myConfigurationRegionals
    );

    const allPrograms = getPrograms(
        myConfigurationPrograms,
        myConfigurationRegionals
    );

    const allGroups = getGroups(
        myConfigurationGroups,
        myConfigurationPrograms
    );

    return [ 
        allRoles, 
        allModalities, 
        allCourseTypes, 
        allRegionals, 
        allCenters, 
        allPrograms, 
        allGroups
    ];
};

const getRoles = (
    myConfigurationRoles,
    myConfigurationRegionals,
    myConfigurationPrograms,
    myConfigurationGroups
) => {
    const listRoles = myConfigurationRoles?.length > 0 
        ? [].concat(myConfigurationRoles) 
        : [];

    if(myConfigurationRegionals?.roles?.length > 0) {
        myConfigurationRegionals.roles.forEach(rol => {
            if(!listRoles.find(e => e.id === rol.id)) {
                listRoles.push(rol);
            }
        });
    }

    if(myConfigurationPrograms?.roles?.length > 0) {
        myConfigurationPrograms.roles.forEach(rol => {
            if(!listRoles.find(e => e.id === rol.id)) {
                listRoles.push(rol);
            }
        });
    }

    if(myConfigurationGroups?.roles?.length > 0) {
        myConfigurationGroups.roles.forEach(rol => {
            if(!listRoles.find(e => e.id === rol.id)) {
                listRoles.push(rol);
            }
        });
    }

    return listRoles;
}

const getModalities = (
    myConfigurationRegionals,
    myConfigurationPrograms
) => {
    const listElement = [];

    if(myConfigurationRegionals?.modalities?.length > 0) {
        myConfigurationRegionals.modalities.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    if(myConfigurationPrograms?.modalities?.length > 0) {
        myConfigurationPrograms.modalities.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    return listElement;
}

const getCourseTypes = (
    myConfigurationRegionals,
    myConfigurationPrograms
) => {
    const listElement = [];

    if(myConfigurationRegionals?.courseTypes?.length > 0) {
        myConfigurationRegionals.courseTypes.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    if(myConfigurationPrograms?.courseTypes?.length > 0) {
        myConfigurationPrograms.courseTypes.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    return listElement;
}

const getRegionals = (
    myConfigurationRegionals
) => {
    const listElement = [];

    if(myConfigurationRegionals?.regionals?.length > 0) {
        myConfigurationRegionals.regionals.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    return listElement;
}

const getCenters = (
    myConfigurationRegionals
) => {

    const listElement = myConfigurationRegionals?.centers?.length > 0 
        ? [].concat(myConfigurationRegionals?.centers) 
        : [];

    if(myConfigurationRegionals?.regionals?.length > 0) {
        myConfigurationRegionals.regionals.forEach(regional => {
            const centers = regional.centers;

            if(centers.length > 0) {
                centers.forEach(center => { 
                    if(!listElement.find(e => e.id === center.id)) {
                        listElement.push(center);
                    }
                });
            }
            
        });
    }

    return listElement;
}

const getPrograms = (
    myConfigurationPrograms,
    myConfigurationRegionals
) => {
    const listElement = [];

    if(myConfigurationPrograms?.programs?.length > 0) {
        myConfigurationPrograms.programs.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    if(myConfigurationRegionals?.programs?.length > 0) {
        myConfigurationRegionals.programs.forEach(element => {
            if(!listElement.find(e => e.id === element.id)) {
                listElement.push(element);
            }
        });
    }

    return listElement;
}

const getGroups = (
    myConfigurationGroups,
    myConfigurationPrograms
) => {

    const listElement = myConfigurationGroups?.groups?.length > 0 
        ? [].concat(myConfigurationGroups.groups) 
        : [];

    if(myConfigurationPrograms?.programs?.length > 0) {
        myConfigurationPrograms.programs.forEach(program => {
            const groups = program?.groups;

            if(groups?.length > 0) {
                groups.forEach(group => { 
                    if(!listElement.find(e => e.id === group.id)) {
                        listElement.push(group);
                    }
                });
            }
            
        });
    }

    return listElement;
}

const getConfiguration = (entity) => {
    const configuration = entity?.configurationAssigment;
    if (typeof configuration !== 'undefined') {
      return JSON.parse(configuration);
    } 
    return [];
};