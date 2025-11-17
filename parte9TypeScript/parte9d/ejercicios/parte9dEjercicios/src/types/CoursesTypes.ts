interface CoursePartBase {
    name: string;
    exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string
}

interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartWithDescription {
    requirements: string[];
    kind: "special";

}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export interface HeaderProps {
    name: string
}

export interface ContentProps {
    parts: CoursePart[]
}

export interface PartProps {
    part: CoursePart
}

export interface TotalProps {
    total: number
}